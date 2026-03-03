'use client'
import React from 'react'
import UseProject from '../../../hooks/use-project'
import { DialogHeader,Dialog, DialogContent, DialogTitle } from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'

const InviteButton = () => {
    const { projectId } = UseProject()
    const [open, setOpen] = React.useState(false)
    const [origin, setOrigin] = React.useState('')

    // ✅ Only runs in browser
    React.useEffect(() => {
        setOrigin(window.location.origin)
    }, [])

    const inviteLink = origin 
        ? `${origin}/join/${projectId}` 
        : ''

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invite Team Members</DialogTitle>
                    </DialogHeader>

                    <p className='text-sm text-gray-500'>
                        Share this link with your team members to invite them to this project
                    </p>

                    <Input
                        className='mt-4'
                        readOnly
                        value={inviteLink}
                        onClick={() => {
                            if (!inviteLink) return
                            navigator.clipboard.writeText(inviteLink)
                            toast.success("Link copied to clipboard")
                        }}
                    />
                </DialogContent>
            </Dialog>

            <Button size='sm' onClick={() => setOpen(true)}>
                Invite Members
            </Button>
        </>
    )
}

export default InviteButton

// const InviteButton = () => {
//     const {projectId} = UseProject()
//     const [open,setOpen] = React.useState(false)
//   return (
//     <>
//     <Dialog open={open} onOpenChange={setOpen}>
//        <DialogContent>
//         <DialogHeader>
//             <DialogTitle>Invite Team Members</DialogTitle>
//         </DialogHeader>
//         <p className='text-sm text-gray-500'>
//             Share this link with your team members to invite them to this project
//         </p>
//         <Input 
//         className='mt-4'
//         readOnly
//         onClick={() =>{
//             navigator.clipboard.writeText(`${window.location.origin}/join/${projectId}`)
//             toast.success("Link copied to clipboard")
//         }}
//         value = {`${window.location.origin}/join/${projectId}`}
//         />
//        </DialogContent>
//     </Dialog>
//     <Button size='sm' onClick={() => setOpen(true)}>
//         Invite Members 
//     </Button>
//     </>
//   )
// }

// export default InviteButton

