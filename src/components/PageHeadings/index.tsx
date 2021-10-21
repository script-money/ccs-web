import logo from '../../images/cryptochasers.png'
import React from 'react'
import { Link, MemoryRouter } from 'react-router-dom'

export interface IPageHeadingsProps {
  isLogin: boolean
  address: string | null
  isSetup?: boolean
  isMainnet?: boolean
  onLogInClick?: () => void
  onUserDetailClick?: () => void
  onSetUpClick?: () => void
  onCreateClick?: () => void
  onFaucetClick?: () => void
}

export const PageHeadings = ({
  isLogin,
  address,
  isSetup,
  isMainnet,
  onLogInClick,
  onUserDetailClick,
  onSetUpClick,
  onFaucetClick
}: IPageHeadingsProps) => {
  return (
    <header className="relative z-10">
      <nav className="sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex py-3 w-full border-b">
          {/* uncomment below line in storybook */}
          {/* <MemoryRouter> */}
          {/* logo */}
          <div className="flex items-center">
            <Link to="/">
              <img className="w-8 h-8" src={logo} alt="" />
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
          {/* uncomment below line in storybook */}
          {/* </MemoryRouter> */}
          {/* tokens */}
          <div className="flex flex-shrink-0 self-center ml-auto">
            {/* faucet */}
            {isSetup && !isMainnet ? (
              <div
                onClick={() => onFaucetClick!()}
                className="inline-block py-2 px-2 sm:px-4 mr-1 text-xs text-white bg-main hover:bg-orange-600 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              >
                Faucet
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
                className="inline-flex overflow-hidden items-center py-2 px-2 sm:px-4 w-16 sm:w-auto text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 rounded border border-gray-300 focus:ring-2 focus:ring-main focus:ring-offset-2 shadow-sm focus:outline-none"
                onClick={() => onUserDetailClick!()}
              >
                {address!.substring(0, 6) + '...' + address!.substring(14, 18)}
              </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
