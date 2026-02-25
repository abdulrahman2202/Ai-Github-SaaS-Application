'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'
import { generateEmbedding } from '../../../lib/gemini'
import { db } from '../../../server/db'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

function createStreamableValue() {
  let controller: ReadableStreamDefaultController<string>

  const stream = new ReadableStream<string>({
    start(c) {
      controller = c
    },
  })

  return {
    stream,
    update(value: string) {
      controller.enqueue(value)
    },
    done() {
      controller.close()
    },
  }
}

export async function askQuestion(question: string, projectId: string) {
  const stream = createStreamableValue()

  const queryVector = await generateEmbedding(question)
  const vectorQuery = `[${queryVector.join(',')}]`

  const result = await db.$queryRaw`
    SELECT "fileName","sourceCode","summary",
    1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
    FROM "SourceCodeEmbedding"
    WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.5
      AND "projectId" = ${projectId}
    ORDER BY similarity DESC
    LIMIT 10
  ` as { fileName: string; sourceCode: string; summary: string }[]

  let context = ''
  for (const doc of result) {
    context += `source: ${doc.fileName}
code content: ${doc.sourceCode}
summary: ${doc.summary}

`
  }

  ;(async () => {
    const response = await model.generateContentStream(`
You are an AI code assistant who answers questions about a GitHub codebase.

Use ONLY the context below. If the answer is not in the context, say you don't know.

CONTEXT:
${context}

QUESTION:
${question}
`)

    for await (const chunk of response.stream) {
      const text = chunk.text()
      if (text) stream.update(text)
    }

    stream.done()
  })()

  return {
    output: stream.stream,
    filesReferences: result,
  }
}
