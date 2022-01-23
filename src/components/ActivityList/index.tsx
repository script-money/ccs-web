import { ActivityItem } from '../ActivityItem'
import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/solid'
import {
  ActivityData,
  categories,
  ICategoryType
} from '../../interface/activity'
import './loading.css'

export interface IActivityListProps {
  isLoading: boolean
  activities: ActivityData[]
  total: number
  pageSize: number
  currentPage: number
  selectedCategory: ICategoryType
  changeCurrent?: (current: number) => void
  changeCanVoteState?: (checked: boolean) => void
  changeCanJoinState?: (checked: boolean) => void
  changeSelectType?: (newCategory: ICategoryType) => void
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const ActivityList = ({
  isLoading,
  activities,
  total,
  pageSize,
  currentPage,
  selectedCategory,
  changeCurrent,
  changeCanVoteState,
  changeCanJoinState,
  changeSelectType
}: IActivityListProps) => {
  const CategorySelector = (
    <Listbox value={selectedCategory} onChange={changeSelectType!}>
      <div className="relative mx-2">
        <Listbox.Button className="relative py-2 pr-10 pl-2 w-full sm:text-sm text-left bg-white rounded-md border border-gray-300 focus:ring-1 shadow-sm cursor-default focus:outline-none focus:ring-main-500 focus:border-main-500">
          <span className="block w-10 truncate">{selectedCategory.type}</span>
          <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="overflow-auto absolute z-10 py-1 mt-1 w-full max-h-60 text-base sm:text-sm bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg focus:outline-none">
            {categories.slice(0, -1).map(category => {
              const categoryBg = `bg-${category.type}-100`
              const categoryText = `text-${category.type}-800`
              return (
                <Listbox.Option
                  key={category.id}
                  className={({ active }) =>
                    classNames(
                      active ? categoryBg : 'text-gray-900',
                      'cursor-default select-none relative py-2 px-2',
                      categoryText
                    )
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={classNames(
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        {category.type}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )

  const Filter = (
    <div className="flex relative z-10 items-center py-2 pr-2 sm:pr-4 pl-4 sm:pl-6 shadow">
      {/* canVote */}
      <div className="flex relative items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300"
            onChange={event => changeCanVoteState!(event.target.checked)}
          />
        </div>
        <div className="ml-1 text-sm">
          <label
            htmlFor="comments"
            className="font-medium tracking-tighter text-gray-700"
          >
            Can Vote Only
          </label>
        </div>
      </div>

      {/* canJoin */}
      <div className="flex relative items-start ml-3">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300"
            onChange={event => changeCanJoinState!(event.target.checked)}
          />
        </div>
        <div className="ml-1 text-sm">
          <label
            htmlFor="comments"
            className="font-medium tracking-tighter text-gray-700"
          >
            Can Join Only
          </label>
        </div>
      </div>
      <div className="flex my-1 ml-auto">{CategorySelector}</div>
    </div>
  )

  const InfoList = (
    <div className="overflow-hidden bg-white shadow">
      <ul role="list" className="divide-y divide-gray-200">
        {activities.map(activity => (
          <li key={activity.id} className="py-4 px-4 sm:px-6">
            <ActivityItem activity={activity} />
          </li>
        ))}
      </ul>
    </div>
  )

  const Pagination = (
    <nav
      className="flex justify-between items-center py-3 pr-2 sm:pr-4 pl-4 sm:pl-6 bg-white border-t border-gray-200"
      aria-label="Pagination"
    >
      <div className="hidden sm:block mr-4">
        <p className="text-sm text-gray-700">
          Showing{' '}
          <span className="font-medium">
            {(currentPage - 1) * pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium">
            {Math.min(currentPage * pageSize, total)}
          </span>{' '}
          of <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end space-x-1">
        {currentPage > 1 ? (
          <a
            // href="#"
            className="inline-flex relative items-center py-2 px-4 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300"
            onClick={() => {
              changeCurrent!(currentPage - 1)
              window.scrollTo({ top: 0 })
            }}
          >
            Previous
          </a>
        ) : (
          <></>
        )}

        {currentPage * pageSize < total ? (
          <a
            // href="#"
            className="inline-flex relative items-center py-2 px-4 ml-auto text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300"
            onClick={() => {
              changeCurrent!(currentPage + 1)
              window.scrollTo({ top: 0 })
            }}
          >
            Next
          </a>
        ) : (
          <></>
        )}
      </div>
    </nav>
  )

  const Loading = (
    <div className="flex overflow-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex-col justify-center items-center w-full h-scree">
      <h2 className="text-xl font-semibold text-center text-gray-500 loading">
        Loading
      </h2>
    </div>
  )

  const NoActivities = (
    <div className="flex overflow-hidden fixed top-0 right-0 bottom-0 left-0 z-0 flex-col justify-center items-center w-full h-scree">
      <h2 className="text-xl font-semibold text-center text-gray-500">
        No activities found
      </h2>
    </div>
  )

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {Filter}
        {Loading}
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {Filter}
        {NoActivities}
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      {Filter}
      {InfoList}
      {Pagination}
    </div>
  )
}
