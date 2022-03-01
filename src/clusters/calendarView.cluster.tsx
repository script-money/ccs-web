import React from 'react'
import { useRequest, useMount } from 'ahooks'
import moment from 'moment'
import { getCalendarViewActivities } from '../api/server'
import { CalendarView } from '../components/CalendarView'
import { useAuth } from '../providers/AuthProvider'

const CalendarViewCluster = () => {
  const { user } = useAuth()

  const { data, loading, run } = useRequest(getCalendarViewActivities, {
    manual: true
  })

  useMount(() => {
    if (user !== undefined) {
      const dateParam = moment().format('YYYY-MM-DD')
      const voterParam = user!.addr!
      run(dateParam, voterParam)
    }
  })

  return (
    <CalendarView
      data={data === undefined ? [] : data.data}
      isLoading={loading ?? true}
      onDateClick={(date: string) => {
        run(date, user!.addr!)
      }}
    ></CalendarView>
  )
}

export default CalendarViewCluster
