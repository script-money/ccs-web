import React from 'react'
import moment from 'moment'

interface ActivityItemProps {
  id: number
  title: string
  createdAt: moment.Moment | string
  startDate: moment.Moment | string
  endDate: moment.Moment | string
  metadata: {
    source: string | null
    content: string | null
    startDate: string | null
    endDate: string | null
    categories: categoriesType[]
  }
  closed: boolean
  creator: {
    address: string
    avatar: string | null
    discord: string | null
    flowns: string | null
    name: string | null
    votingPower: number
  }
}

export type categoriesType =
  | 'Interact'
  | 'Form'
  | 'Vote'
  | 'Test'
  | 'Node'
  | 'Learn'
  | 'Create'
  | 'Develop'
  | 'Whitelist'
  | 'IXO'
  | 'LuckDraw'
  | 'Register'

/**
 * Primary UI component for user interaction
 */
export const ActivityItem = ({
  id,
  title,
  createdAt,
  metadata,
  closed,
  creator
}: ActivityItemProps) => {
  return (
    <div className="flex">
      {/* infomation */}
      <div className="sm:flex ">
        <div className="self-center">
          <div className="inline-flex flex-shrink-0 items-center">
            {!closed ? (
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
            {title}
          </h4>
          <div className="inline-flex">
            {metadata.categories.map((category, index) => {
              return <Badget key={index} category={category}></Badget>
            })}
          </div>
          <p className="px-2.5 text-sm text-gray-600">
            #{id} created at {moment(createdAt).startOf('hour').fromNow()} by{' '}
            {creator.discord ?? creator.address}
          </p>
        </div>
        <div className="inline-flex items-center py-0.5 mx-2 text-xs text-gray-400">
          {moment(metadata.startDate ?? createdAt).format('lll')} ——{' '}
          {moment(metadata.endDate).format('lll')}
        </div>
      </div>
      {/* button */}
      <div className="sm:flex">
        <button
          type="button"
          className="inline-flex items-center py-1.5 px-2.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 rounded border border-gray-300 focus:ring-2 focus:ring-offset-2 shadow-sm focus:outline-none focus:ring-indigo-500"
        >
          {closed ? 'result' : 'vote'}
        </button>
      </div>
    </div>
  )
}

interface BadgetProps {
  category: categoriesType
}

const Badget = ({ category }: BadgetProps) => {
  return (
    <span
      className={`inline-flex items-center py-0.5 px-2.5 mx-0.5 text-xs font-medium text-${category}-800 bg-${category}-100 rounded-full`}
    >
      {category}
    </span>
  )
}
