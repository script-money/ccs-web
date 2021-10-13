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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLogIn, logIn, logOut } = useCurrentUser()

  if (!user || !isLogIn)
    return (
      <>
        <PageHeadings
          isLogin={false}
          address={null}
          onLogInClick={() => logIn()}
        />
        {children}
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
      <PageHeadings
        isLogin={true}
        address={user!.addr}
        onLogOutClick={() => logOut()}
      />
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
