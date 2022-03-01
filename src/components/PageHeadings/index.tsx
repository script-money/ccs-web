import logo from '../../images/cryptochasers.png'
import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link, MemoryRouter } from 'react-router-dom'

export interface IPageHeadingsProps {
  isLogin: boolean
  address: string | null
  isSetup?: boolean
  isMainnet?: boolean
  isFaucetLoading?: boolean
  onLogInClick?: () => void
  onUserDetailClick?: () => void
  onSetUpClick?: () => void
  onCreateClick?: () => void
  onFaucetClick?: () => void
}

export const PageHeadings = ({
  isLogin,
  isSetup,
  isMainnet,
  isFaucetLoading,
  onLogInClick,
  onUserDetailClick,
  onSetUpClick,
  onFaucetClick
}: IPageHeadingsProps) => {
  return (
    <header className="relative z-10">
      <nav className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex py-3 w-full border-b">
          {/* uncomment below line in storybook */}
          {/* <MemoryRouter> */}
          {/* logo */}
          <div className="flex items-center">
            <Link to="/">
              <img className="w-8 h-8" src={logo} alt="" />
            </Link>
            <Link
              to="/"
              className="hidden lg:inline-block py-2 px-2 ml-4 w-14 text-xs text-center text-main whitespace-nowrap hover:bg-orange-600 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
            >
              Home
            </Link>
          </div>
          {/* createActivity */}
          {isSetup ? (
            <Link
              to="/create-activity"
              className="inline-block py-2 px-2 ml-2 w-14 text-xs text-main whitespace-nowrap hover:bg-orange-600 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
            >
              Create
            </Link>
          ) : (
            <></>
          )}
          {/* calendarView */}
          {isSetup ? (
            <Link
              to="/calendar"
              className="inline-block py-2 px-2 ml-2 w-18 text-xs text-main whitespace-nowrap hover:bg-orange-600 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
            >
              Calendar
            </Link>
          ) : (
            <></>
          )}
          {/* uncomment below line in storybook */}
          {/* </MemoryRouter> */}
          {/* tokens */}
          <div className="flex flex-shrink-0 self-center ml-auto">
            {/* faucet */}
            {isSetup && !isMainnet ? (
              <div
                onClick={() => onFaucetClick!()}
                className="flex py-2 px-2 mr-1 space-x-2 text-xs text-white bg-main hover:bg-orange-600 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              >
                {isFaucetLoading ? (
                  <svg
                    className="w-4 h-4 text-white animate-spin"
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
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                <span>Facuet</span>
              </div>
            ) : (
              <></>
            )}
            {isLogin && !isSetup ? (
              <a
                className="inline-block py-2 px-2 sm:px-4 mr-1 text-xs text-white bg-main hover:bg-orange-600 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm focus:outline-none"
                onClick={() => onSetUpClick!()}
              >
                SetUp
              </a>
            ) : (
              <></>
            )}

            {/* logInButton */}
            {!isLogin ? (
              <a
                className="inline-block py-2 px-2 sm:px-4 text-xs text-white bg-main hover:bg-orange-600 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm focus:outline-none"
                onClick={() => onLogInClick!()}
              >
                Sign in
              </a>
            ) : (
              <a
                className="overflow-hidden"
                onClick={() => onUserDetailClick!()}
              >
                <div className="inline-flex items-center py-2 px-3 sm:px-4 w-16 sm:w-auto text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 rounded border border-gray-300 focus:ring-2 focus:ring-main focus:ring-offset-2 shadow-sm focus:outline-none">
                  {isSetup ? 'Wallet' : 'Logout'}
                </div>
              </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
