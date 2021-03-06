import { useRequest } from 'ahooks'
import { getActivityList, getMaintenance, updateUser } from '../api/server'
import { ActivityList } from '../components/ActivityList'
import React, { useEffect, useReducer, useState } from 'react'
import { categories, ICategoryType } from '../interface/activity'
import { useAuth } from '../providers/AuthProvider'
import { useHistory } from 'react-router-dom'
import { IResponse } from '../interface/util'
import {
  alertReducer,
  AlertType,
  initialAlertState
} from '../reducer/alertReducer'
import { Alerts } from '../components/Alerts'
import { MaintenanceBanner } from '../components/MaintenanceBanner'
interface ILocation {
  hash: string
  pathname: string
  search: string
  state: undefined
}

const ActivityCluster = ({ location }: { location?: ILocation }) => {
  const { user } = useAuth()
  const [canVoteState, setCanVoteState] = useState<boolean>()
  const [canJoinState, setCanJoinState] = useState<boolean>()
  const [maintenanceState, setMaintenanceState] = useState<boolean>()
  const [showBanner, setShowBanner] = useState<boolean>(false)

  const [selectedCategory, setSelectedCategory] = useState<ICategoryType>(
    categories[0] as ICategoryType
  )
  const [state, dispatch] = useReducer(alertReducer, initialAlertState)

  const history = useHistory()

  const { data, loading, pagination } = useRequest(
    ({ current, pageSize }) =>
      getActivityList(
        current,
        pageSize, // should adjust reference screen height
        selectedCategory.type === 'All' ? undefined : selectedCategory.type,
        canVoteState ? true : undefined,
        user === undefined ? undefined : user!.addr!,
        canJoinState ? true : undefined
      ),
    {
      paginated: true,
      formatResult: i => {
        return { list: i.data, total: i.total }
      },
      refreshDeps: [canVoteState, canJoinState, selectedCategory],
      loadingDelay: 200,
      throwOnError: true,
      onError: (err: any) => {
        history.push('/error')
        console.log(err)
      }
    }
  )

  const { data: updateResponse, run: runUpdateUser } = useRequest<IResponse>(
    (code, state) => updateUser(code, state),
    {
      manual: true
    }
  )

  const { data: getMaintenanceResponse, run: runGetMaintenance } =
    useRequest<IResponse>(() => getMaintenance(), {
      manual: true
    })

  useEffect(() => {
    const params = new URLSearchParams(location!.search)
    const code = params.get('code')
    const state = params.get('state')
    const activity = params.get('activity')
    if (code && state) {
      runUpdateUser(code, state)
      history.push('/')
      return
    }
    if (activity) {
      history.push(`/activity/${activity}`)
    }
    runGetMaintenance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (getMaintenanceResponse && getMaintenanceResponse.success) {
      const isMaintenance = getMaintenanceResponse.data.maintenance
      setMaintenanceState(isMaintenance)
      if (isMaintenance) {
        setShowBanner(true)
      }
    }
  }, [getMaintenanceResponse])

  useEffect(() => {
    if (updateResponse !== undefined) {
      let timer: any = null
      if (updateResponse?.success) {
        dispatch({
          alertType: AlertType.Success,
          message: 'Link discord success'
        })
      } else {
        dispatch({
          alertType: AlertType.Error,
          message: updateResponse!.errorMessage!
        })
      }

      // close alert after 3 seconds
      timer = setTimeout(
        () =>
          dispatch({
            alertType: AlertType.None
          }),
        3000
      )
      return () => clearTimeout(timer)
    }
  }, [updateResponse])

  return (
    <>
      {state.alertType !== AlertType.None ? (
        <Alerts status={state.alertType} message={state.message}></Alerts>
      ) : (
        <></>
      )}
      {maintenanceState && showBanner ? (
        <MaintenanceBanner
          onClose={() => setShowBanner(false)}
        ></MaintenanceBanner>
      ) : (
        <></>
      )}
      <ActivityList
        isLoading={loading ?? true}
        activities={data === undefined ? [] : data.list}
        total={pagination.total}
        pageSize={10}
        currentPage={pagination.current}
        changeCurrent={pagination.changeCurrent}
        changeCanVoteState={value => setCanVoteState(value)}
        changeCanJoinState={value => setCanJoinState(value)}
        selectedCategory={selectedCategory}
        changeSelectType={setSelectedCategory}
      ></ActivityList>
    </>
  )
}

export default ActivityCluster
