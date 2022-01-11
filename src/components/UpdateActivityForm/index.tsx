import React, { useState } from 'react'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import { ActivityData } from '../../interface/activity'
import '../CreateActivityForm/Calendar.css'
import '../CreateActivityForm/DatePicker.css'

export interface IUpdateActivityFormProps {
  activity: ActivityData
  onSubmit: (messageToSign: string) => void
}

export const UpdateActivityForm = ({
  activity,
  onSubmit
}: IUpdateActivityFormProps) => {
  const [content, setContent] = useState<string>(activity.content ?? '')
  const [startDate, setStartDate] = useState<Date>(
    new Date(activity.startDate as string)
  )
  const [endDate, setEndDate] = useState<Date | null>(
    activity.endDate === null ? null : new Date(activity.endDate as string)
  )
  const [source, setSource] = useState<string>(activity.source ?? '')

  return (
    <div
      className="overflow-hidden p-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-white"
      style={{ minHeight: 'calc(100vh - 16px)' }}
    >
      <form
        action="#"
        method="POST"
        className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-y-3"
      >
        {/* title */}
        <div className="sm:col-span-2">
          <div className="mt-1">
            {/* title+id */}
            <div className="flex flex-wrap items-center">
              <div className="inline-flex space-x-1">
                <span className="text-xl sm:text-2xl lg:text-3xl font-normal">
                  {activity.title}
                </span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-500">
                  #{activity.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="sm:col-span-2">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <div className="mt-1">
            <textarea
              id="content"
              name="content"
              rows={2}
              value={content}
              onChange={e => setContent!(e.target.value)}
              className="block py-3 px-4 w-full rounded-md border border-gray-300 focus:border-main focus:ring-main shadow-sm"
            />
          </div>
        </div>

        {/* datePicker */}
        <div className="flex sm:col-span-2 md:col-span-1">
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <div className="mt-1">
              <DatePicker
                onChange={setStartDate}
                value={startDate}
                calendarIcon={null}
                clearIcon={<div></div>}
                format={'y-MM-dd'}
                name="startDate"
              />
            </div>
          </div>
          <div className="ml-4">
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <div className="mt-1">
              <DatePicker
                onChange={setEndDate}
                value={endDate}
                calendarIcon={null}
                format={'y-MM-dd'}
                name="endDate"
                minDate={startDate}
              />
            </div>
          </div>
        </div>

        {/* source */}
        <div className="sm:col-span-2 md:col-span-1">
          <label
            htmlFor="source"
            className="block text-sm font-medium text-gray-700"
          >
            Source
          </label>
          <div className="mt-1">
            <textarea
              id="source"
              name="source"
              autoComplete="url"
              rows={1}
              value={source}
              onChange={e => setSource!(e.target.value)}
              placeholder="(optional) the source URL activity publish"
              className="block py-3 px-4 w-full rounded-md border border-gray-300 focus:border-main focus:ring-main shadow-sm"
            />
          </div>
        </div>

        {/* submit button */}
        <div className="sm:col-span-2 mt-4">
          <button
            type="submit"
            // disabled={sendAmount > hasAmount}
            onClick={e => {
              e.preventDefault()
              const contentToSubmit =
                content === activity.content ? undefined : content
              const sourceToSubmit =
                source === activity.source ? undefined : source
              const startDateToSubmit =
                startDate.valueOf() ===
                new Date(activity.startDate as string).valueOf()
                  ? undefined
                  : startDate

              let endDateToSubmit = undefined
              if (endDate !== null && activity.endDate === null) {
                endDateToSubmit = endDate
              } else if (endDate !== null && activity.endDate !== null) {
                endDateToSubmit =
                  endDate.valueOf() ===
                  new Date(activity.endDate as string).valueOf()
                    ? undefined
                    : endDate
              } else if (endDate === null) {
                endDateToSubmit = null
              }

              if (
                contentToSubmit === undefined &&
                sourceToSubmit === undefined &&
                startDateToSubmit === undefined &&
                endDateToSubmit === undefined
              ) {
                alert('No changes to submit')
                return
              }

              onSubmit(
                JSON.stringify({
                  content: contentToSubmit,
                  source: sourceToSubmit,
                  startDate: startDateToSubmit,
                  endDate: endDateToSubmit
                })
              )
            }}
            className="main-button"
          >
            Update Activity
          </button>
        </div>
      </form>
    </div>
  )
}
