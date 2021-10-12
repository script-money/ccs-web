import React, { createContext, useContext } from 'react'
import { PageHeadings } from '../components/PageHeadings'
import useCurrentUser, { SessionUser } from '../hooks/use-current-user.hook'

interface IAuthContext {
  user?: SessionUser
  isLogIn: boolean
  logIn?: Promise<SessionUser>
  logOut?: Promise<any>
}

export const AuthContext = createContext<IAuthContext>({
  isLogIn: false
})

export const AuthProvider = (children: any) => {
  const { user, isLogIn, logIn, logOut } = useCurrentUser()

  if (!user || !isLogIn)
    return (
      <>
        <PageHeadings isLogin={false} address={null}></PageHeadings>
      </>
    )
  return (
    <AuthContext.Provider
      value={{
        user,
        isLogIn,
        logIn,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
