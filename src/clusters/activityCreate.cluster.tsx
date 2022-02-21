import React from 'react'
import { useMount } from 'ahooks'
import { CreateActivityForm } from '../components/CreateActivityForm'
import useActivity from '../hooks/use-activity.hook'
import useCCSToken from '../hooks/use-ccs-token.hook'
import { useAuth } from '../providers/AuthProvider'

const CreateActivityCluster = () => {
  const { user } = useAuth()
  const { createActivity } = useActivity()
  const { data: ccsToken, getCCSBalance } = useCCSToken(user!)

  let timer: NodeJS.Timeout

  const handleSubmit = (title: string, metadata: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      createActivity(title!, metadata!)
    }, 500)
  }

  useMount(() => {
    if (user !== undefined) {
      getCCSBalance()
    }
  })

  return (
    <>
      <CreateActivityForm
        sendAmount={100}
        hasAmount={ccsToken}
        onSubmit={handleSubmit}
      ></CreateActivityForm>
    </>
  )
}

export default CreateActivityCluster
