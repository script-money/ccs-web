import logo from '../../images/cryptochasers.png'
import React from 'react'

export interface IPageHeadingsProps {
  isLogin: boolean
  address: string | null
  ballots?: number
  ccsToken?: number
  onLogInClick?: () => void
  onLogOutClick?: () => void
}

export const PageHeadings = ({
  isLogin,
  address,
  ballots,
  ccsToken,
  onLogInClick,
  onLogOutClick
}: IPageHeadingsProps) => {
  return (
    <header>
      <nav className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl" aria-label="Top">
        <div className="flex justify-between items-center py-6 w-full border-b">
          {/* logo */}
          <div className="flex items-center">
            <a href="#">
              <img className="w-auto h-8" src={logo} alt="" />
            </a>
          </div>
          {isLogin ? (
            <div className="flex ml-auto">
              {/* ballots */}
              <div className="flex justify-between items-baseline mr-4 text-xs">
                <div>🗳</div>
                <div className="ml-1 text-gray-500">{ballots ?? 0}</div>
              </div>
              {/* $CCS */}
              <div className="flex justify-between items-baseline mr-4 text-xs">
                <div>$CCS</div>
                <div className="ml-1 text-gray-500">{ccsToken ?? 0}</div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* logInButton */}
          <div className="space-x-4">
            {!isLogin ? (
              <a
                className="inline-block py-2 px-4 text-white bg-main hover:bg-orange-600 rounded-md border border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm focus:outline-none"
                onClick={() => onLogInClick!()}
              >
                Sign in
              </a>
            ) : (
              <a
                className="inline-flex items-center py-2 px-4 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 rounded border border-gray-300 focus:ring-2 focus:ring-main focus:ring-offset-2 shadow-sm focus:outline-none"
                onClick={() => onLogOutClick!()}
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
