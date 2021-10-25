import React from 'react'
import useActivity from '../hooks/use-activity.hook'
import { useAuth } from '../providers/AuthProvider'
import { getActivityDetail } from '../api/server'
import { useMount, useRequest } from 'ahooks'
import { useHistory, useParams } from 'react-router-dom'
import { GetActivityParams } from '../interface/activity'
// const ActivityDetail = React.lazy(() => import('../components/ActivityDetail'))
import ActivityDetail from '../components/ActivityDetail'
import '../components/ActivityList/loading.css'

const ActivityDetailCluster = () => {
  const { vote } = useActivity()
  const { id } = useParams<GetActivityParams>()
  const { user } = useAuth()
  const history = useHistory()

  const { data, run } = useRequest(getActivityDetail, {
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
        <div className="flex overflow-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex-col justify-center items-center w-full h-scree">
          <h2 className="text-xl font-semibold text-center text-gray-500 loading">
            Loading
          </h2>
        </div>
      )}
    </>
  )
}

export default ActivityDetailCluster
