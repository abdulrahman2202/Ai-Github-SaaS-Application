'use server';

import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc'; 
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateEmbedding } from '../../../lib/gemini';
import { db } from '../../../server/db';



const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export async function askQuestion(question:string,projectId:string){
    const stream = createStreamableValue()

    const queryVector = await generateEmbedding(question)
    const vectorQuery = `[${queryVector.join(',')}]`

    const result = await db.$queryRaw`
    SELECT "fileName","sourceCode","summary",
    1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
    FROM "SourceCodeEmbedding"
    Where 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > .5
    AND "projectId" = ${projectId}
    ORDER BY similarity DESC
     LIMIT 10
    ` as {fileName:string; sourceCode: string;summary:string}[]

    let context = ''

    for(const doc of result){
        context += `source: ${doc.fileName}\ncode content: ${doc.sourceCode}\n summary of file: ${doc.summary}\n\n`
    }
    (async () => {
        const { textStream } = await streamText({
            model: google('gemini-1.5-pro'),
            prompt: `
You are an AI code assistant who answers questions about a GitHub codebase.

Your target audience is a technical intern or junior developer who is learning how the code works.

You are:
- Helpful, clear, and precise
- Technical but easy to understand
- Focused only on the provided codebase context
- Able to explain concepts step-by-step when needed

You must strictly follow these rules:
- Use ONLY the information from the CONTEXT BLOCK below
- Do NOT invent files, functions, or logic
- If the answer cannot be found in the context, say:
  "I'm sorry, but I don't know the answer based on the provided context."
- Do not mention that you are an AI model
- Do not apologize unnecessarily
- Do not repeat the question
- Answer in **Markdown**
- Use code blocks when explaining code
- Be as detailed and helpful as possible

====================
START CONTEXT BLOCK
${context}
END CONTEXT BLOCK
====================

====================
START QUESTION
${question}
END QUESTION
====================

Now answer the question using only the context above.
`,
        })
        for await (const delta of textStream){
            stream.update(delta)
        }

        stream.done()
    })()

    return {
        output:stream,
        filesReferences: result
    }
}