'use client'

import React from 'react'
import UseProject from '../../../hooks/use-project'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Textarea } from '../../../components/ui/textarea'
import { Button } from '../../../components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog'
import Image from 'next/image'
import { askQuestion } from './actions'

async function readReadableStream(
    stream: ReadableStream<string>,
    onChunk: (chunk: string) => void
  ) {
    const reader = stream.getReader()
  
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      if (value) onChunk(value)
    }
  }

const AskQuestionCard = () => {
    const {project} = UseProject()
    const [question,setQuestion] = React.useState('')
    const [open,setOpen] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const [filesReferences,setFilesReferences] = React.useState<{fileName:string,sourceCode:string,summary:string}[]>([]) 
    const [answer,setAnswer] = React.useState('')

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(!project?.id) return
        setLoading(true)
        setOpen(true)

        const {output,filesReferences} = await askQuestion(question,project.id) 
        setFilesReferences(filesReferences)

        await readReadableStream(output, (delta) => {
            setAnswer(ans => ans + delta)
          })
        
          setLoading(false)
    }
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    <Image src='/TechTonic.png' alt='TechTonic Workplace' width={40} height={40} />
                </DialogTitle>
            </DialogHeader>
            {answer}
            <h1>Files References</h1>
            {filesReferences.map(file =>{
                return <span>{file.fileName}</span>
            })}
        </DialogContent>
    </Dialog>
    <Card className='relative col-span-3'>
        <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={onSubmit}>
                <Textarea placeholder='Which file should I edit to change the home page?' value={question} onChange={e => setQuestion(e.target.value)} />
                <div className="h-4"></div>
                <Button type='submit'>
                    Ask TechTonic-AI
                </Button>
            </form>
        </CardContent>
    </Card>
    </>
  )
}

export default AskQuestionCard