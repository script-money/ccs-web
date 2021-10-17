import React from 'react'
import { txStatus } from '../../reducer/defaultReducer'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'

export interface ITxDetailProps {
  id?: string
  status: txStatus
}

export const TxDetail = ({ id, status }: ITxDetailProps) => {
  const [open, setOpen] = useState(true)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="overflow-y-auto fixed inset-0 z-10"
        onClose={setOpen}
      >
        {/* background */}
        <div className="flex sm:block justify-center items-end sm:p-0 px-4 pt-4 pb-20 min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block overflow-hidden sm:p-6 px-4 pt-5 pb-4 sm:my-8 sm:w-full sm:max-w-sm text-left align-bottom sm:align-middle bg-white rounded-lg shadow-xl transition-all transform">
              <div>
                <div className="flex justify-center items-center mx-auto w-16 h-16">
                  {status === 'PROCESSING' ? (
                    <div className="w-12 h-12 rounded-full border-b-2 border-gray-500 animate-spin"></div>
                  ) : status === 'SUCCESS' ? (
                    <div className="flex justify-center items-center mx-auto w-12 h-12 bg-green-100 rounded-full">
                      <CheckIcon
                        className="w-6 h-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center mx-auto w-12 h-12 bg-red-100 rounded-full">
                      <ExclamationIcon
                        className="w-6 h-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-3 sm:mt-5 text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-sm leading-6 text-gray-900"
                  >
                    {status === 'SUCCESS' ? (
                      'Send Transaction Success'
                    ) : status === 'PROCESSING' ? (
                      <></>
                    ) : (
                      'Send Transaction Fail'
                    )}
                  </Dialog.Title>
                  <Dialog.Description as="h4" className="text-xs text-gray-600">
                    {status === 'PROCESSING' ? (
                      'waiting confirm...'
                    ) : (
                      <a
                        className="text-gray-400 hover:text-gray-600 underline"
                        href={'https://flowscan.org/transaction/' + id}
                      >
                        TX:{id?.slice(0, 32)}...
                      </a>
                    )}
                  </Dialog.Description>
                </div>
              </div>
              {status !== 'PROCESSING' ? (
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="main-button"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
