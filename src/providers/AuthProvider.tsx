import React, { createContext, useContext, useEffect, useState } from 'react'
import { PageHeadings } from '../components/PageHeadings'
import { UserDetail } from '../components/UserDetail'
import useAccount from '../hooks/use-account.hook'
import useBallot from '../hooks/use-ballot.hook'
import useCurrentUser, { SessionUser } from '../hooks/use-current-user.hook'
import useUserDetail from '../hooks/use-user-detail.hook'

export interface IAuthContext {
  user?: SessionUser
  isLogIn: boolean
  logIn?: Promise<SessionUser>
  logOut?: Promise<any>
  openUserDetail: boolean
}

export const AuthContext = createContext<IAuthContext>({
  isLogIn: false,
  openUserDetail: false
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLogIn, logIn, logOut } = useCurrentUser()
  const [openUserDetail, setOpenUserDetail] = useState(false)

  const {
    data: isInitialized,
    isAccountInitialized,
    initializeAccount
  } = useAccount(user!)

  const {
    error,
    loading,
    run,
    address,
    userName,
    discord,
    votingPower,
    ccsToken,
    ballots
  } = useUserDetail(user!)

  const { buyBallots } = useBallot(user!)

  useEffect(() => {
    if (isLogIn) {
      console.log(`checking ${user?.addr} isAccountInitialized`)
      isAccountInitialized()
    }
  }, [isLogIn])

  const showUserDetail = () => {
    setOpenUserDetail(true)
  }

  const hideUserDetail = () => {
    setOpenUserDetail(false)
  }

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
        logOut,
        openUserDetail
      }}
    >
      {isInitialized != null &&
      Object.keys(isInitialized).every(k => isInitialized[k]) ? (
        <>
          <PageHeadings
            isLogin={true}
            address={user!.addr}
            isSetup={isInitialized}
            onUserDetailClick={() => {
              run(user)
              showUserDetail()
            }}
            onCreateClick={() => (window.location.href = '/create-activity')}
          />
          <UserDetail
            address={address!}
            userName={userName ?? 'not set'}
            ballotAmount={ballots}
            votingPower={votingPower}
            tokenAmount={ccsToken}
            open={openUserDetail}
            onBuyClick={buyBallots}
            onLinkClick={() => alert('coming soon')}
            onLogoutClick={() => logOut()}
            onCloseWindow={hideUserDetail}
          />
        </>
      ) : (
        <PageHeadings
          isLogin={true}
          address={user!.addr}
          isSetup={false}
          onUserDetailClick={() => logOut()}
          onSetUpClick={() => initializeAccount()}
        />
      )}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
