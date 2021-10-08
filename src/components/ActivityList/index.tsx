import React from 'react'

import { ActivityData, ActivityItem } from '../ActivityItem'

export interface IActivityListProps {
  loading: boolean
  activities: ActivityData[]
  total: number
  limit: number
  currentPage: number
  onPrevious?: (limit: number, current: number) => void
  onNext?: (limit: number, current: number) => void
}

export const ActivityList = ({
  loading,
  activities,
  total,
  limit = 5,
  currentPage = 1,
  onPrevious,
  onNext
}: IActivityListProps) => {
  const Pagination = (
    <nav
      className="flex justify-between items-center py-3 px-4 sm:px-6 bg-white border-t border-gray-200"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing{' '}
          <span className="font-medium">{(currentPage - 1) * limit + 1}</span>{' '}
          to <span className="font-medium">{currentPage * limit}</span> of{' '}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          href="#"
          className="inline-flex relative items-center py-2 px-4 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300"
          onClick={() => onPrevious!(limit, currentPage - 1)}
        >
          Previous
        </a>
        <a
          href="#"
          className="inline-flex relative items-center py-2 px-4 ml-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300"
          onClick={() => onNext!(limit, currentPage + 1)}
        >
          Next
        </a>
      </div>
    </nav>
  )

  if (loading) {
    return <div className="list-items">loading</div>
  }

  if (activities.length === 0) {
    return <div className="list-items">empty</div>
  }

  return (
    <div>
      <div className="overflow-hidden bg-white sm:rounded-md shadow">
        <ul role="list" className="divide-y divide-gray-200">
          {activities.map(activity => (
            <li key={activity.id} className="py-4 px-4 sm:px-6">
              <ActivityItem activity={activity} />
            </li>
          ))}
        </ul>
      </div>
      {Pagination}
    </div>
  )
}
