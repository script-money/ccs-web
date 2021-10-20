import React from 'react'
import { CreateActivityForm } from '../components/CreateActivityForm'
import useActivity from '../hooks/use-activity.hook'
import useCCSToken from '../hooks/use-ccs-token.hook'
import { useAuth } from '../providers/AuthProvider'

export const CreateActivityCluster = () => {
  const { user } = useAuth()
  const { createActivity } = useActivity()
  const { data: ccsToken } = useCCSToken(user!)

  return (
    <>
      <CreateActivityForm
        sendAmount={100}
        hasAmount={ccsToken}
        onSubmit={(title, metadata) => createActivity(title!, metadata!)}
      ></CreateActivityForm>
    </>
  )
}
