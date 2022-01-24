import React from 'react'
import { ActivityDetailProps } from '../../interface/activity'
import moment from 'moment'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link, MemoryRouter } from 'react-router-dom'
import { urlRegex } from '../../utils'

const ActivityDetail = ({
  activity,
  currentUserAddr,
  onUpVote,
  onDownVote
}: ActivityDetailProps) => {
  return (
    <div className="relative min-h-screen">
      <main className="py-4">
        {/* title+voteButton*/}
        <div className="md:flex md:justify-between md:items-center px-4 sm:px-6 lg:px-8 mx-auto md:space-x-5 max-w-3xl lg:max-w-7xl">
          {/* infomation */}
          <div className="flex flex-col flex-grow">
            {/* title+id+edit */}
            <div className="flex flex-wrap items-center">
              <div className="inline-flex space-x-1">
                <span className="text-xl sm:text-2xl lg:text-3xl font-normal">
                  {activity.title}
                </span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-500">
                  #{activity.id}
                </span>
                {currentUserAddr === activity.creatorAddr ? (
                  <>
                    {/* uncomment below line in storybook */}
                    {/* <MemoryRouter> */}
                    <Link
                      className="flex-shrink-0 self-center flex-grow-1"
                      to={`/update-activity/${activity.id}`}
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                    {/* uncomment below line in storybook */}
                    {/* </MemoryRouter> */}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center">
              {/* status */}
              <div className="flex-shrink-0 self-center my-2 mr-2">
                {!activity.closed ? (
                  <span
                    title="Status: Open"
                    className="inline-block py-1.5 px-1.5 text-sm text-white whitespace-nowrap bg-open rounded-2xl"
                  >
                    <svg
                      height="16"
                      className="inline-block overflow-visible align-text-bottom fill-current"
                      viewBox="0 0 16 16"
                      version="1.1"
                      width="16"
                      aria-hidden="true"
                    >
                      <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                      <path
                        fillRule="evenodd"
                        d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                      ></path>
                    </svg>{' '}
                    Open{' '}
                  </span>
                ) : (
                  <span
                    title="Status: Closed"
                    className="inline-block py-1.5 px-1.5 text-sm text-white whitespace-nowrap bg-closed rounded-2xl"
                  >
                    <svg
                      height="16"
                      className="inline-block overflow-visible align-text-bottom fill-current"
                      viewBox="0 0 16 16"
                      version="1.1"
                      width="16"
                      aria-hidden="true"
                    >
                      <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                      <path
                        fillRule="evenodd"
                        d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                      ></path>
                    </svg>{' '}
                    Closed{' '}
                  </span>
                )}
              </div>
              {/* created at by */}
              <div className="text-sm text-gray-600 whitespace-nowrap">
                created by{' '}
                <a className="font-semibold text-gray-600">
                  {/* {activity.creator.name ?? activity.creatorAddr} */}
                  {activity.creatorAddr}
                </a>
              </div>
            </div>
          </div>
          {/* voteButton */}
          {!activity.closed ? (
            <div className="flex md:flex-col">
              <div className="flex flex-shrink items-start mb-4 space-x-4">
                <button
                  type="button"
                  className="justify-center p-4 w-12 h-12 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300 focus:ring-2 focus:ring-main focus:ring-offset-2 shadow-sm disabled:opacity-50 focus:outline-none"
                  onClick={() => {
                    onUpVote!()
                  }}
                  disabled={
                    activity.creatorAddr === currentUserAddr ||
                    currentUserAddr === undefined
                  }
                >
                  <span>👍</span>
                </button>
                <button
                  type="button"
                  className="justify-center p-4 w-12 h-12 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300 focus:ring-2 focus:ring-main focus:ring-offset-2 shadow-sm disabled:opacity-50 focus:outline-none"
                  onClick={() => onDownVote!()}
                  disabled={
                    activity.creatorAddr === currentUserAddr ||
                    currentUserAddr === undefined
                  }
                >
                  <span>👎</span>
                </button>
              </div>
              <div className="flex items-center -mt-3 ml-4">
                <span className="text-xs text-red-500">
                  {activity.creatorAddr !== currentUserAddr
                    ? currentUserAddr === undefined
                      ? 'Log in to Vote'
                      : 'Can vote once'
                    : 'Already voted'}
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* Activity Detail*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-flow-col-dense gap-6 sm:px-6 mx-auto mt-2 max-w-3xl lg:max-w-7xl">
          <div className="col-span-3 col-start-1 space-y-6">
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white sm:rounded-lg border">
                <div className="py-5 px-4 sm:px-6 bg-gray-50">
                  <h2 className="text-lg font-medium leading-6 text-gray-900">
                    Activity Detail
                  </h2>
                </div>
                <div className="py-5 px-4 sm:px-6 border-t border-gray-200">
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-6">
                    <div className="sm:col-span-2 md:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Create At
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {moment(activity.createdAt).startOf('hour').fromNow()}
                      </dd>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Voting Close At
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {activity.lockDate === null
                          ? moment(activity.createdAt)
                              .add(1, 'days')
                              .startOf('hour')
                              .fromNow()
                          : moment(activity.lockDate).startOf('hour').fromNow()}
                      </dd>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Start At
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {activity.startDate === null
                          ? 'TBD'
                          : moment(activity.startDate)
                              .startOf('hour')
                              .fromNow()}
                      </dd>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        End At
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {activity.endDate === null
                          ? 'TBD'
                          : moment(activity.endDate).startOf('hour').fromNow()}
                      </dd>
                    </div>
                    <div className="col-span-2 sm:col-span-4 lg:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Source
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <div className="pr-4">
                          {activity.source !== null &&
                          urlRegex.test(activity.source) ? (
                            <a
                              className="text-blue-600 hover:text-blue-800 underline break-all"
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
                      </dd>
                    </div>
                    <div className="col-span-2 sm:col-span-4 lg:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Categories
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {activity.metadata.categories.join(' / ')}
                      </dd>
                    </div>
                    <div className="col-span-2 sm:col-span-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Content
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {activity.content}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Reward Detail*/}
        {activity.closed ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-col-dense gap-6 sm:px-6 mx-auto mt-4 max-w-3xl lg:max-w-7xl">
            <div className="lg:col-span-2 lg:col-start-1 space-y-6">
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white sm:rounded-lg border">
                  <div className="py-5 px-4 sm:px-6 bg-gray-50">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">
                      Reward Detail
                    </h2>
                  </div>
                  <div className="py-5 px-4 sm:px-6 border-t border-gray-200">
                    <dl className="grid grid-cols-1 sm:grid-cols-4 gap-y-6">
                      <div className="sm:col-span-2 md:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Vote Result
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {activity.upVote > activity.downVote ? '👍' : '👎'}
                        </dd>
                      </div>
                      <div className="sm:col-span-2 md:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Reward Token
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {activity.rewardToken}
                        </dd>
                      </div>
                      <div className="sm:col-span-2 md:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Total Voting Power
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {activity.absTotalPower}
                        </dd>
                      </div>
                      <div className="sm:col-span-2 md:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Memorial Bouns
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {activity.bouns}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Vote Result */}
        {activity.closed ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-col-dense gap-6 sm:px-6 mx-auto mt-4 max-w-3xl lg:max-w-7xl">
            <div className="lg:col-span-2 lg:col-start-1 space-y-6">
              <div className="overflow-hidden sm:rounded-lg border border-gray-200">
                <div className="py-5 px-4 sm:px-6 bg-gray-50 border-b">
                  <h2 className="text-lg font-medium leading-6 text-gray-900">
                    Vote Result
                  </h2>
                </div>
                <div className="px-4 sm:px-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="hidden md:block py-3 md:w-1/4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="py-3 md:w-1/4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className="py-3 md:w-1/4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Vote
                        </th>
                        <th
                          scope="col"
                          className="py-3 md:w-1/4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Power
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity!.voteResult!.map(vote => (
                        <tr key={vote.id}>
                          <td className="hidden md:block py-3 lg:px-0 text-sm text-gray-500 whitespace-nowrap">
                            {vote.id}
                          </td>
                          <td className="py-3 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                            {vote.voterAddr}
                          </td>
                          <td className="py-3 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                            {vote.isUpVote ? '👍' : '👎'}
                          </td>
                          <td className="py-3 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                            {vote.power}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </main>
    </div>
  )
}

export default ActivityDetail
