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
      <div className="p-4 m-4 sm:mx-6 bg-green-50 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="w-5 h-5 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">{message}</p>
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
    )
  } else if (status === 'ERROR' && open) {
    return (
      <div className="p-4 m-4 sm:mx-6 bg-red-50 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{message}</h3>
          </div>
          <div className="self-center pr-3 ml-auto">
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
    )
  } else {
    return <></>
  }
}
