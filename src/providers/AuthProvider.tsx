import React, { createContext, useContext, useEffect } from 'react'
import { PageHeadings } from '../components/PageHeadings'
import useAccount from '../hooks/use-account.hook'
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
  const {
    data: isInitialized,
    isAccountInitialized,
    initializeAccount
  } = useAccount(user!)

  useEffect(() => {
    if (isLogIn) {
      console.log(`checking ${user?.addr} isAccountInitialized`)
      isAccountInitialized()
    }
  }, [isLogIn])

  if (!user || !isLogIn) {
    return (
      <>
        <PageHeadings
          isLogin={false}
          address={null}
          isSetup={false}
          onLogInClick={() => logIn()}
        />
        {children}
      </>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogIn,
        logIn,
        logOut
      }}
    >
      {isInitialized != null &&
      Object.keys(isInitialized).every(k => isInitialized[k]) ? (
        <PageHeadings
          isLogin={true}
          address={user!.addr}
          isSetup={isInitialized}
          onLogOutClick={() => logOut()}
        />
      ) : (
        <PageHeadings
          isLogin={true}
          address={user!.addr}
          isSetup={false}
          onLogOutClick={() => logOut()}
          onSetUpClick={() => initializeAccount()}
          onCreateClick={() => (window.location.href = '/create-activity')}
        />
      )}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
