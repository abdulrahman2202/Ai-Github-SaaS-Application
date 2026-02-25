'use client'

import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import UseProject from '../../../hooks/use-project'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Textarea } from '../../../components/ui/textarea'
import { Button } from '../../../components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog'
import Image from 'next/image'
import { askQuestion } from './actions'
import CodeReferences from './code-references'
import { api } from '../../../trpc/react'
import { toast } from 'sonner'

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
    const saveAnswer = api.project.saveAnswer.useMutation()

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        setAnswer('')
        setFilesReferences([])
        e.preventDefault()
        if(!project?.id) return
        setLoading(true)

        const {output,filesReferences} = await askQuestion(question,project.id) 
        setOpen(true)
        setFilesReferences(filesReferences)

        await readReadableStream(output, (delta) => {
            setAnswer(ans => ans + delta)
          })
        
          setLoading(false)
    }
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[80vw]'>
            <DialogHeader>
                <div className='flex items-center gap-2'>
                    <DialogTitle>
                        <Image src='/TechTonic.png' alt='TechTonic Workplace' width={40} height={40} />
                    </DialogTitle>
                    <Button disabled={saveAnswer.isPending} variant={'outline'} onClick={()=>{
                        saveAnswer.mutate({
                            projectId:project!.id,
                            question,
                            answer,
                            filesReferences
                        },{
                            onSuccess:()=>{
                                toast.success('Answer saved successfully')
                            },
                            onError:()=>{
                                toast.error('Failed to save answer')
                            }
                        })
                    }}>
                        Save Answer
                    </Button>
                </div>
                
            </DialogHeader>
            <MDEditor.Markdown source={answer} className='max-w-[70vw] h-full max-h-[40vh] overflow-scroll'/>
            <div className='h-4'></div>
            <CodeReferences filesReferences={filesReferences} />

            <Button type='button' onClick={() => {setOpen(false)}}>
                Close
            </Button>
            {/* <h1>Files References</h1> */}
            {/* {filesReferences.map(file =>{
                return <span>{file.fileName}</span>
            })} */}
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
                <Button type='submit' disabled={loading}>
                    Ask TechTonic-AI
                </Button>
            </form>
        </CardContent>
    </Card>
    </>
  )
}

export default AskQuestionCard