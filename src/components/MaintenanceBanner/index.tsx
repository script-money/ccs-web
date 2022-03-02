import React from 'react'
import { XIcon } from '@heroicons/react/outline'

export interface IMaintenanceBannerProps {
  onClose?: () => void
}

export const MaintenanceBanner = ({ onClose }: IMaintenanceBannerProps) => {
  return (
    <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
      <div className="px-2 outer-container">
        <div className="p-2 sm:p-3 bg-red-600 rounded-lg shadow-lg">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex flex-1 items-center w-0">
              <p className="ml-3 text-sm md:text-base font-medium text-white truncate">
                <span className="md:hidden">Server is under maintenance</span>
                <span className="hidden md:inline">
                  Server is under maintenance. View details in{' '}
                  <a
                    href="https://discord.gg/cryptochasers"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://discord.gg/cryptochasers
                  </a>
                </span>
              </p>
            </div>
            <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-2">
              <button
                type="button"
                className="flex p-2 -mr-1 hover:bg-red-500 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
                onClick={() => onClose!()}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
