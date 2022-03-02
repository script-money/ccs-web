import React, { useMemo, useState } from 'react'
/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { CalendarIcon } from '@heroicons/react/outline'
import { monthCalendarInfo, getMonthCalendarInfo } from './utils'
import moment from 'moment'
import { CalendarViewActivity } from '../../interface/activity'
import { Badget } from '../ActivityItem'
import { classNames, urlRegex } from '../../utils'

export interface CalendarViewProps {
  data: CalendarViewActivity[]
  isLoading: boolean
  onDateClick?: (date: string) => void
}

export const CalendarView = ({
  data,
  isLoading,
  onDateClick
}: CalendarViewProps) => {
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format('YYYY-MM-DD')
  )
  const [months, setMonths] = useState<monthCalendarInfo[]>([
    getMonthCalendarInfo(moment().add(monthOffset, 'month')),
    getMonthCalendarInfo(moment().add(monthOffset + 1, 'month'))
  ])

  useMemo(() => {
    const now = moment()
    setMonths([
      getMonthCalendarInfo(now.clone().add(monthOffset, 'month')),
      getMonthCalendarInfo(now.clone().add(monthOffset + 1, 'month'))
    ])
  }, [monthOffset])

  const calendar = (
    <div className="grid relative grid-cols-1 md:grid-cols-2 gap-x-14">
      <button
        onClick={() => {
          setMonthOffset(monthOffset - 1)
        }}
        type="button"
        className="flex absolute -top-1 -left-1.5 justify-center items-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        onClick={() => {
          setMonthOffset(monthOffset + 1)
        }}
        type="button"
        className="flex absolute -top-1 -right-1.5 justify-center items-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
      </button>
      {months.map((month, monthIdx) => (
        <section
          key={monthIdx}
          className={classNames(
            monthIdx === months.length - 1 && 'hidden md:block',
            'text-center'
          )}
        >
          <h2 className="font-semibold text-gray-900">{month.name}</h2>
          <div className="grid grid-cols-7 mt-2 md:mt-6 text-xs leading-6 text-gray-500">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="grid isolate grid-cols-7 gap-px mt-2 text-sm bg-gray-200 rounded-lg ring-1 ring-gray-200 shadow">
            {month.days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-50 text-gray-400',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  dayIdx === month.days.length - 7 && 'rounded-bl-lg',
                  dayIdx === month.days.length - 1 && 'rounded-br-lg',
                  'relative py-1.5 hover:bg-gray-100 focus:z-10'
                )}
                onClick={() => {
                  onDateClick!(day.date)
                  setSelectedDate(day.date)
                }}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isToday && 'font-semibold',
                    'text-sm lg:text-lg text-gray-900'
                  )}
                >
                  {day.date.split('-').pop()!.replace(/^0/, '')}
                </time>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )

  const selectedDateElement = (
    <div className="flex items-center mt-2 sm:mt-4 ">
      <CalendarIcon className="mr-1 w-5 h-5" aria-hidden="true"></CalendarIcon>
      <h2 className="text-lg font-semibold text-gray-900">{selectedDate}</h2>
    </div>
  )

  const loading = (
    <div className="flex overflow-hidden z-50 flex-col justify-center items-center mt-10 md:mt-20 w-full h-scree">
      <h2 className="text-xl font-semibold text-center text-gray-500 loading">
        Loading
      </h2>
    </div>
  )

  const empty = (
    <div className="flex overflow-hidden z-50 flex-col justify-center items-center mt-10 md:mt-20 w-full h-scree">
      <h2 className="text-xl font-semibold text-center text-gray-500">
        No activity
      </h2>
    </div>
  )

  const activityList = (
    <section className="overflow-hidden mt-2 md:mt-8 bg-white shadow">
      <ol className="text-sm leading-4 text-gray-500 divide-y divide-gray-200">
        {data.length > 0 &&
          data.map((activity, idx) => {
            return (
              <div className="px-2" key={idx}>
                <li className="md:flex py-2">
                  <div className="flex flex-1 pr-2">
                    <h4 className="self-center font-semibold text-gray-900">
                      {activity.title}
                    </h4>
                  </div>

                  <div className="flex p-1">
                    {activity.source !== null &&
                    urlRegex.test(activity.source) ? (
                      <a
                        className="self-center text-blue-600 hover:text-blue-800 underline break-all"
                        href={activity.source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {activity.source}
                      </a>
                    ) : (
                      <div className="break-all">{activity.source}</div>
                    )}
                  </div>
                  <div className="flex-none mt-2 md:mt-0 md:w-40">
                    {activity.categories.map((category, index) => {
                      return <Badget key={index} category={category}></Badget>
                    })}
                  </div>
                  <time className="hidden md:block flex-none self-center md:px-1 mb-2 md:mb-0 w-20">
                    End at{' '}
                    {activity.endDate === undefined || activity.endDate === null
                      ? 'TBD'
                      : moment(activity.endDate).format('YYYY/MM/DD')}
                  </time>
                </li>
              </div>
            )
          })}
      </ol>
    </section>
  )

  return (
    <div className="outer-container">
      {calendar}
      {selectedDateElement}
      {isLoading ? loading : data.length === 0 ? empty : activityList}
    </div>
  )
}
