import React from 'react'
import useActivity from '../hooks/use-activity.hook'
import { useAuth } from '../providers/AuthProvider'
import { getActivityDetail } from '../api/server'
import { useMount, useRequest } from 'ahooks'
import { useHistory, useParams } from 'react-router-dom'
import ActivityDetail from '../components/ActivityDetail'
import '../components/ActivityList/loading.css'
import useBallot from '../hooks/use-ballot.hook'

const ActivityDetailCluster = () => {
  const { vote } = useActivity()
  const { id } = useParams()
  const { user } = useAuth()
  const history = useHistory()
  const { data: ballotsAmount, getHodings } = useBallot(user)
  const { data, run } = useRequest(getActivityDetail, {
    manual: true,
    debounceInterval: 500,
    throwOnError: true,
    loadingDelay: 300,
    onError: () => {
      history.push('/404')
    },
    onSuccess: res => {
      if (!res.success) {
        history.push('/404')
      }
    }
  })

  useMount(() => {
    run(parseInt(id!))
    getHodings()
  })

  let timer: NodeJS.Timeout

  const handleVote = (id: string | undefined, isVoteUp: boolean) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      vote(parseInt(id!), isVoteUp)
    }, 500)
  }

  return (
    <>
      {data && data?.data !== null ? (
        <ActivityDetail
          activity={data?.data}
          currentUserAddr={user === undefined ? undefined : user!.addr!}
          hasBallots={ballotsAmount > 0}
          onUpVote={() => handleVote(id, true)}
          onDownVote={() => handleVote(id, false)}
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
