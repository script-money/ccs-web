import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { ActionType } from '../../reducer/txReducer'
import React from 'react'

export interface ITxInfoProps {
  id?: string
  errorMessage?: string
  status: ActionType
  show: boolean
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
}

export const TxInfo = ({
  id,
  errorMessage,
  status,
  show,
  setShow
}: ITxInfoProps) => {
  return (
    <>
      {status === ActionType.Reset ? (
        <></>
      ) : (
        <div
          aria-live="assertive"
          className="flex fixed inset-0 z-20 items-end md:items-start sm:p-6 py-6 px-4 pointer-events-none"
        >
          <div className="flex flex-col items-center md:items-end sm:mt-10 space-y-4 w-full">
            <Transition
              show={show}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="overflow-hidden w-full md:w-auto max-w-sm bg-white rounded-lg ring-1 ring-black ring-opacity-5 shadow-lg pointer-events-auto">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {status === 'SUCCESS' || status == 'TIP' ? (
                        <CheckCircleIcon
                          className="w-6 h-6 text-open"
                          aria-hidden="true"
                        />
                      ) : status === 'ERROR' ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-closed"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="mr-3 -ml-1 w-5 h-5 text-open animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 pt-0.5 ml-3">
                      {status === 'SUCCESS' || status == 'TIP' ? (
                        <p className="text-sm font-medium text-gray-900">
                          Transaction success!
                        </p>
                      ) : status === 'PROCESSING' ? (
                        <p className="text-sm font-medium text-gray-900">
                          Transaction confirming...
                        </p>
                      ) : (
                        <p className="text-sm font-medium text-gray-900">
                          Transaction failed!
                        </p>
                      )}
                      {status === 'PROCESSING' ? (
                        <></>
                      ) : status === 'ERROR' ? (
                        <p className="text-sm text-gray-400">
                          {errorMessage ?? 'Transaction was canceled by user'}
                        </p>
                      ) : (
                        <a
                          className="text-xs sm:text-sm text-gray-400 hover:text-gray-600 underline"
                          href={'https://flowscan.org/transaction/' + id}
                        >
                          TX:{id?.slice(0, 24)}...
                        </a>
                      )}
                    </div>
                    <div className="flex flex-shrink-0 ml-4">
                      <button
                        className="inline-flex text-gray-400 hover:text-gray-500 bg-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                        onClick={() => {
                          setShow!(false)
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      )}
    </>
  )
}
