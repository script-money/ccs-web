import React from 'react'
import { useState } from 'react'
import { AlertType } from '../../reducer/alertReducer'
import { CheckCircleIcon, XIcon, XCircleIcon } from '@heroicons/react/solid'

export interface IAlertsProps {
  status: AlertType
  message?: string
}

export const Alerts = ({ status, message }: IAlertsProps) => {
  const [open, setOpen] = useState(true)
  if (status === 'SUCCESS' && open) {
    return (
      <div className="outer-container">
        <div className="p-4 bg-green-50 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="w-5 h-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-1 sm:ml-3 text-xs sm:text-sm font-medium text-green-800 text-ellipsis">
              {message}
            </div>
            <div className="pl-3 ml-auto">
              <div className="-my-1.5 -mx-1.5">
                <button
                  type="button"
                  className="inline-flex p-1.5 text-green-500 bg-green-50 hover:bg-green-100 rounded-md focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (status === 'ERROR' && open) {
    return (
      <div className="outer-container">
        <div className="p-4 sm:mx-4 bg-red-50 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="w-5 h-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-1 sm:ml-3 text-xs sm:text-sm font-medium text-red-800 truncate">
              {message}
            </div>
            <div className="flex-none self-center sm:pr-3 ml-auto">
              <div className="-my-1.5 -mx-1.5">
                <button
                  type="button"
                  className="inline-flex p-1.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-md focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50 focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
