import React from 'react'
import moment from 'moment'
import { ActivityItemProps, categoriesType } from '../../interface/activity'
import { Link, MemoryRouter } from 'react-router-dom'

/**
 * Primary UI component for user interaction
 */
export const ActivityItem = ({ activity, onEnter }: ActivityItemProps) => {
  const Badget = ({ category }: { category: categoriesType }) => {
    return (
      <span
        className={`inline-flex items-center py-0.5 px-2.5 mx-0.5 text-xs font-medium text-${category}-800 bg-${category}-100 rounded-full`}
      >
        {category}
      </span>
    )
  }

  return (
    <div className="flex items-center px-2 -my-2 -mx-2 space-x-4 rounded-xl">
      {/* infomation */}
      <div className="flex flex-col flex-grow">
        {/* icon+title+tags */}
        <div className="flex flex-wrap items-center">
          <div className="inline-flex">
            <div className="inline-flex flex-shrink-0 items-center">
              {!activity.closed ? (
                <svg
                  className="text-open fill-current"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  <path
                    fillRule="evenodd"
                    d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="text-closed fill-current"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path d="M11.28 6.78a.75.75 0 00-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5z"></path>
                  <path
                    fillRule="evenodd"
                    d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  ></path>
                </svg>
              )}
            </div>
            <h4 className="inline-flex items-center py-0.5 px-2.5 text-lg font-bold">
              {activity.title}
            </h4>
          </div>
          <div className="inline-flex">
            {activity.metadata.categories.map((category, index) => {
              return <Badget key={index} category={category}></Badget>
            })}
          </div>
        </div>
        {/* created at by */}
        <div className="text-xs text-gray-600 whitespace-nowrap">
          #{activity.id} created at{' '}
          {moment(activity.createdAt).startOf('hour').fromNow()} by{' '}
          {activity.creator.discord ?? activity.creator.address}
        </div>
        {/* start-end */}
        <div className="inline-flex items-center py-0.5 text-xs text-gray-400">
          {moment(activity.metadata.startDate ?? activity.createdAt).format(
            'lll'
          )}{' '}
          ——{' '}
          {activity.metadata.endDate === undefined
            ? 'TBD'
            : moment(activity.metadata.endDate).format('lll')}
        </div>
      </div>
      {/* button */}
      {/* uncomment below line in storybook */}
      {/* <MemoryRouter> */}
      <Link
        className="flex-shrink-0 self-center flex-grow-1"
        to={`/activity/${activity.id}`}
        rel="noopener noreferrer"
      >
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      {/* uncomment below line in storybook */}
      {/* </MemoryRouter> */}
    </div>
  )
}
