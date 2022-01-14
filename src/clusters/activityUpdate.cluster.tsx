import React from 'react'
import { UpdateActivityForm } from '../components/UpdateActivityForm'
import useActivity from '../hooks/use-activity.hook'
import { getActivityDetail, updateActivity } from '../api/server'
import { useMount, useRequest } from 'ahooks'
import { useHistory, useParams } from 'react-router-dom'
import '../components/ActivityList/loading.css'

const UpdateActivityCluster = () => {
  const { updateActivitySign } = useActivity()

  const { id } = useParams()
  const history = useHistory()

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
  })

  return (
    <>
      {data !== undefined && data!.data !== null ? (
        <UpdateActivityForm
          activity={data!.data}
          onSubmit={async metadata => {
            const signResult = await updateActivitySign(metadata)
            await updateActivity(
              Number(id),
              signResult!.message,
              signResult!.signature
            )
            history.push(`/activity/${id}`)
          }}
        ></UpdateActivityForm>
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

export default UpdateActivityCluster
