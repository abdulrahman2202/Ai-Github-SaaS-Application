'use client'

import { useForm } from "react-hook-form"

type FormInput = {
    repoUrl : string
    projectName: string
    githubToken?: string
}

const CreatePage = () => {
    const {register,handleSubmit,reset} = useForm<FormInput>()
  return (
    <div>CreatePage</div>
  )
}

export default CreatePage