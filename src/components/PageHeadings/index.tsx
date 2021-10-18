import logo from '../../images/cryptochasers.png'
import React from 'react'
import { Link, MemoryRouter } from 'react-router-dom'

export interface IPageHeadingsProps {
  isLogin: boolean
  address: string | null
  isSetup?: boolean
  onLogInClick?: () => void
  onUserDetailClick?: () => void
  onSetUpClick?: () => void
  onCreateClick?: () => void
}

export const PageHeadings = ({
  isLogin,
  address,
  isSetup,
  onLogInClick,
  onUserDetailClick,
  onSetUpClick
}: IPageHeadingsProps) => {
  return (
    <header className="relative z-10">
      <nav className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex py-3 w-full border-b">
          {/* <MemoryRouter> */}
          {/* logo */}
          <div className="flex items-center">
            <Link to="/">
              <img className="w-auto h-8" src={logo} alt="" />
            </Link>
          </div>
          {/* createActivity */}
          {isSetup ? (
            <Link
              to="/create-activity"
              className="py-2 px-4 text-xs text-main hover:bg-orange-600"
            >
              Create Activity
            </Link>
          ) : (
            <></>
          )}
          {/* </MemoryRouter> */}
          {/* tokens */}

          <div className="flex-shrink-0 self-end ml-auto">
            {isLogin && !isSetup ? (
              <a
                className="inline-block py-2 px-4 mr-1 text-xs text-white bg-main hover:bg-orange-600 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm focus:outline-none"
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
                className="inline-block py-2 px-4 text-xs text-white bg-main hover:bg-orange-600 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm focus:outline-none"
                onClick={() => onLogInClick!()}
              >
                Sign in
              </a>
            ) : (
              <a
                className="inline-flex items-center py-2 px-4 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 rounded border border-gray-300 focus:ring-2 focus:ring-main focus:ring-offset-2 shadow-sm focus:outline-none"
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
