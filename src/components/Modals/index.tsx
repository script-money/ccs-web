import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'

interface IModalsProps {
  onSubmit?: () => void
}

export const Modals = ({ onSubmit }: IModalsProps) => {
  const [open, setOpen] = useState(true)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="overflow-y-auto fixed inset-0 z-10"
        onClose={setOpen}
      >
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
            <div className="inline-block overflow-hidden sm:p-6 px-4 pt-5 pb-4 sm:my-8 sm:w-full sm:max-w-lg text-left align-bottom sm:align-middle bg-white rounded-lg shadow-xl transition-all transform">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 bg-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="flex flex-shrink-0 justify-center items-center mx-auto sm:mx-0 w-12 sm:w-10 h-12 sm:h-10 bg-orange-100 rounded-full">
                  <ExclamationIcon
                    className="w-6 h-6 text-orange-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-4 text-center sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    initialize your account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You need send setup account transaction first to use DApp,
                      need 0.00001 FLOW to pay fee.
                    </p>
                  </div>
                </div>
              </div>
              <div className="sm:flex sm:flex-row-reverse mt-5 sm:mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 sm:ml-3 w-full sm:w-auto text-base sm:text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm focus:outline-none"
                  onClick={() => {
                    setOpen(false)
                    onSubmit!()
                  }}
                >
                  Initialize
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
