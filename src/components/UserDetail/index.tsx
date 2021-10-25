import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import './userDetail.css'

interface IUserDetailProps {
  address: string
  userName?: string
  ballotAmount?: number
  votingPower?: number
  tokenAmount?: number
  ballotPrice?: number
  open: boolean
  onBuyClick?: (amount: number) => void
  onLinkClick?: () => void
  onLogoutClick?: () => void
  onCloseWindow?: () => void
}

export const UserDetail = ({
  address,
  ballotAmount,
  votingPower,
  tokenAmount,
  ballotPrice,
  open = true,
  onBuyClick,
  onLogoutClick,
  onCloseWindow
}: IUserDetailProps) => {
  // const [open, setOpen] = useState(false)
  const [ballotCount, setBallotCount] = useState(0)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="overflow-y-auto fixed inset-0 z-10"
        onClose={() => {
          // setOpen(false)
          onCloseWindow!()
        }}
      >
        <div className="flex justify-center items-center px-4 pt-4 pb-20 min-h-screen text-center">
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

          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
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
              {/* closeButton */}
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 bg-white rounded-md focus:ring-2 focus:ring-main focus:ring-offset-2 focus:outline-none"
                  onClick={() => {
                    onCloseWindow!()
                    // setOpen(false)
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              {/* address */}
              <div className="userdetail-item">
                <Dialog.Title className="userdetail-title">
                  Address
                </Dialog.Title>
                <div className="flex items-center">
                  <p className="userdetail-info">{address}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400 hover:text-gray-500 bg-white rounded-md focus:ring-2 focus:ring-main focus:ring-offset-2 focus:outline-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() =>
                      navigator.clipboard
                        .writeText(address)
                        .then(() => alert('Address is copied to the clipboard'))
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              {/* username */}
              {/* <div className="userdetail-item">
                <Dialog.Title className="userdetail-title">
                  User Name
                </Dialog.Title>
                {userName === undefined ? (
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center py-1.5 px-2.5 text-xs font-medium text-white bg-discord hover:bg-indigo-700 rounded border border-transparent shadow-sm focus:outline-none"
                      onClick={() => onLinkClick!()}
                    >
                      Link Discord
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-shrink-0 items-baseline space-x-4">
                    <p className="userdetail-info">{userName}</p>
                    <button
                      type="button"
                      className="items-center px-1 mx-1 ml-auto h-10 text-xs font-medium text-white bg-discord hover:bg-indigo-700 rounded border border-transparent shadow-sm focus:outline-none w-18"
                      onClick={() => onLinkClick!()}
                    >
                      ReLink
                    </button>
                  </div>
                )}
              </div> */}
              {/* VotePower */}
              <div className="userdetail-item">
                <Dialog.Title className="userdetail-title">
                  Voting Power
                </Dialog.Title>
                <div className="flex items-center space-x-4">
                  <div className="flex">
                    <p className="userdetail-info">
                      Current: {votingPower ?? 0}
                    </p>
                  </div>
                </div>
              </div>
              {/* CCSToken */}
              <div className="userdetail-item">
                <Dialog.Title className="userdetail-title">
                  CCSToken
                </Dialog.Title>
                <div className="flex items-center space-x-4">
                  <div className="flex">
                    <p className="userdetail-info">
                      Current: {tokenAmount ?? 0}
                    </p>
                  </div>
                </div>
              </div>
              {/* BallotPrice */}
              <div className="userdetail-item">
                <Dialog.Title className="userdetail-title">
                  Ballot Price
                </Dialog.Title>
                <div className="flex items-center space-x-4">
                  <div className="flex">
                    <p className="userdetail-info">
                      Current: {ballotPrice ?? 0}
                    </p>
                  </div>
                </div>
              </div>
              {/* ballots */}
              <div>
                <div className="userdetail-item">
                  <Dialog.Title className="userdetail-title">
                    Ballots
                  </Dialog.Title>
                  <p className="userdetail-info">
                    Current: {ballotAmount ?? 0}
                  </p>
                </div>
                {/* ballots buy selector */}
                <div className="flex items-center space-x-4">
                  <div className="flex relative flex-row flex-shrink mt-1 w-full h-10 bg-transparent rounded-lg">
                    <button
                      data-action="decrement"
                      className="w-20 h-full text-gray-600 hover:text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-l cursor-pointer outline-none"
                      onClick={() =>
                        setBallotCount(Math.max(0, ballotCount - 1))
                      }
                    >
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      className="flex items-center w-full font-semibold text-center text-gray-700 hover:text-black focus:text-black bg-gray-300 outline-none focus:outline-none text-md md:text-basecursor-default"
                      name="custom-input-number"
                      value={ballotCount}
                      onChange={value => console.log(value)}
                    ></input>
                    <button
                      data-action="increment"
                      className="w-20 h-full text-gray-600 hover:text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-r cursor-pointer"
                      onClick={() => setBallotCount(ballotCount + 1)}
                    >
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center p-2 my-2 mx-1 font-medium text-gray-700 bg-white hover:bg-gray-50 rounded border border-gray-300 shadow-sm focus:outline-none"
                    onClick={() => onBuyClick!(ballotCount)}
                  >
                    Buy
                  </button>
                </div>
              </div>

              {/* logout */}
              <div className="sm:flex sm:flex-row-reverse mt-5 sm:mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 sm:ml-3 w-full sm:w-auto text-base sm:text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm focus:outline-none"
                  onClick={() => {
                    // setOpen(false)
                    onLogoutClick!()
                    onCloseWindow!()
                  }}
                >
                  LogOut
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
