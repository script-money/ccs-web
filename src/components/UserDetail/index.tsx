import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import './userDetail.css'

interface IUserDetailProps {
  address: string
  userName?: string | null
  ballotAmount?: number
  votingPower?: number
  tokenAmount?: number
  ballotPrice?: number
  open: boolean
  setOpen?: (isOpen: boolean) => void
  onBuyClick?: (amount: number) => void
  onLogoutClick?: () => void
  onCloseWindow?: () => void
  onViewMemorials?: () => void
}

export const UserDetail = ({
  address,
  userName,
  ballotAmount,
  votingPower,
  tokenAmount,
  ballotPrice,
  open = true,
  setOpen,
  onBuyClick,
  onLogoutClick,
  onCloseWindow,
  onViewMemorials
}: IUserDetailProps) => {
  // const [open, setOpen] = useState(false)
  const [ballotCount, setBallotCount] = useState<number>(10)

  const OAuthData = new URLSearchParams({
    response_type: 'code',
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID as string,
    redirect_uri: `${import.meta.env.VITE_DOMAIN}`,
    scope: ['identify'].join(' '),
    state: address
  })

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
        <div className="flex justify-center items-center min-h-screen text-center">
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
            <div className="inline-block overflow-hidden sm:p-6 px-4 pt-5 pb-4 sm:my-8 sm:w-96 sm:max-w-lg text-left align-bottom sm:align-middle bg-white rounded-lg shadow-xl transition-all transform">
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
              <div className="userdetail-item">
                <Dialog.Title className="userdetail-title">
                  User Name
                </Dialog.Title>
                {userName === null || userName === undefined ? (
                  <a
                    href={`https://discordapp.com/oauth2/authorize?${OAuthData}`}
                  >
                    <button type="button" className="w-24 userdetail-discord">
                      Link Discord
                    </button>
                  </a>
                ) : (
                  <div className="flex flex-shrink-0 items-baseline space-x-1">
                    <p className="userdetail-info">{userName}</p>
                    <a
                      href={`https://discordapp.com/oauth2/authorize?${OAuthData}`}
                    >
                      <button type="button" className="userdetail-discord">
                        ReLink
                      </button>
                    </a>
                  </div>
                )}
              </div>
              {/* VotePower */}
              <div className="userdetail-item">
                <Dialog.Title className="userdetail-title">
                  VotingPower
                </Dialog.Title>
                <div className="flex items-center">
                  <div className="flex">
                    <p className="userdetail-info">{votingPower ?? 0}</p>
                  </div>
                </div>
                {votingPower && (
                  <a
                    className="text-xs text-blue-600 hover:text-blue-800 underline break-all"
                    onClick={() => {
                      onViewMemorials!()
                      setOpen!(false)
                    }}
                  >
                    view detail
                  </a>
                )}
              </div>
              {/* CCSToken */}
              <div className="userdetail-item">
                <Dialog.Title className="userdetail-title">
                  CCS Token
                </Dialog.Title>
                <div className="flex items-center space-x-4">
                  <div className="flex">
                    <p className="userdetail-info">
                      {tokenAmount ?? 'loading...'}
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
                      {ballotPrice ?? 'loading...'}
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
                    {ballotAmount ?? 'loading...'}
                  </p>
                </div>
              </div>
              <div className="userdetail-item">
                {/* ballots buy selector */}
                <Dialog.Title className="userdetail-title">
                  Buy Ballots
                </Dialog.Title>
                <div className="flex items-center space-x-4">
                  <div>
                    <input
                      type="number"
                      className="flex items-center ml-auto w-20 font-semibold leading-8 text-center text-gray-700 hover:text-black focus:text-black bg-gray-300 outline-none focus:outline-none text-md md:text-basecursor-default"
                      name="custom-input-number"
                      defaultValue={ballotCount}
                      placeholder="Max 500"
                      max={500}
                      onChange={e =>
                        setBallotCount(
                          Math.min(500, parseInt(e.target.value) || ballotCount)
                        )
                      }
                    ></input>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center p-2 mx-1 font-medium text-gray-700 bg-white hover:bg-gray-50 rounded border border-gray-300 shadow-sm focus:outline-none"
                    onClick={() => onBuyClick!(ballotCount)}
                  >
                    Buy
                  </button>
                </div>
              </div>

              {/* logout */}
              <div className="sm:flex sm:flex-row-reverse mt-8 h-10">
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
