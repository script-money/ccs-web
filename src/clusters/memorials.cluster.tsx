import { useRequest, useMount } from 'ahooks'
import React from 'react'
import { getMemorials } from '../api/server'
const MemorialsList = React.lazy(() => import('../components/MemorialsList'))
import { useAuth } from '../providers/AuthProvider'

const MemorialsCluster = () => {
  const { user } = useAuth()

  const { data, run } = useRequest(getMemorials, {
    manual: true
  })

  useMount(() => {
    if (user !== undefined) run(user!.addr!)
  })

  return (
    <>
      {data !== undefined && data?.data!.length !== 0 ? (
        <MemorialsList data={data!.data!}></MemorialsList>
      ) : (
        <MemorialsList data={null}></MemorialsList>
      )}
    </>
  )
}

export default MemorialsCluster
