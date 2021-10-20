import React, { useEffect } from 'react'
import useActivity from '../hooks/use-activity.hook'
import { useAuth } from '../providers/AuthProvider'
import { getActivityDetail } from '../api/server'
import { useMount, useRequest } from 'ahooks'
import { useHistory, useParams } from 'react-router-dom'
import { GetActivityParams } from '../interface/activity'
// const ActivityDetail = React.lazy(() => import('../components/ActivityDetail'))
import ActivityDetail from '../components/ActivityDetail'

export const ActivityDetailCluster = () => {
  const { vote } = useActivity()
  const { id } = useParams<GetActivityParams>()
  const { user } = useAuth()
  const history = useHistory()

  const { data, error, loading, run } = useRequest(getActivityDetail, {
    manual: true,
    debounceInterval: 500,
    throwOnError: true,
    loadingDelay: 300,
    onError: () => {
      history.push('/404')
    }
  })

  useMount(() => {
    run(parseInt(id))
  })

  return (
    <>
      {data && data?.data !== null ? (
        <ActivityDetail
          activity={data?.data}
          currentUserAddr={user === undefined ? undefined : user!.addr!}
          onUpVote={() => vote(parseInt(id), true)}
          onDownVote={() => vote(parseInt(id), false)}
        />
      ) : (
        <>loading</>
      )}
    </>
  )
}
