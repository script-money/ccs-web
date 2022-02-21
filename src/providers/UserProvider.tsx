import { createContext, useContext } from 'react'
import useAccount from '../hooks/use-account.hook'
import useBallot from '../hooks/use-ballot.hook'
import useCCSToken from '../hooks/use-ccs-token.hook'
import { useAuth } from './AuthProvider'
import React from 'react'

interface IUserContext {
  isInitialized: boolean
  ccsAmount: number
  ballotAmount: number
  isAccountInitialized?: () => Promise<boolean | undefined>
  initializeAccount?: () => Promise<void>
  getHodings?: () => Promise<void>
  buyBallots?: (count: number) => Promise<void>
  getCCSBalance?: () => Promise<void>
}

export const UserContext = createContext<IUserContext>({
  isInitialized: false,
  ccsAmount: 0,
  ballotAmount: 0
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const {
    data: isInitialized,
    isAccountInitialized,
    initializeAccount
  } = useAccount(user!)
  const { data: ballotAmount, getHodings, buyBallots } = useBallot(user!)
  const { data: ccsAmount, getCCSBalance } = useCCSToken(user!) // use authprovider balance?

  return (
    <UserContext.Provider
      value={{
        isInitialized,
        ccsAmount,
        ballotAmount,
        isAccountInitialized,
        initializeAccount,
        getHodings,
        buyBallots,
        getCCSBalance
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
