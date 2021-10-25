import useRequest from '@ahooksjs/use-request'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { requestToken } from '../api/server'
import { PageHeadings } from '../components/PageHeadings'
import { UserDetail } from '../components/UserDetail'
import useAccount from '../hooks/use-account.hook'
import useBallot from '../hooks/use-ballot.hook'
import useCCSToken from '../hooks/use-ccs-token.hook'
import useCurrentUser, { SessionUser } from '../hooks/use-current-user.hook'
import useBallotPrice from '../hooks/use-ballot-price.hook'
import useUserDetail from '../hooks/use-user-detail.hook'
import { IResponse } from '../interface/util'

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
  const { data: ccsTokenAmount, getCCSBalance } = useCCSToken(user)
  const { data: ballotsAmount, buyBallots, getHodings } = useBallot(user!)
  const { data: ballotPrice, getPrice } = useBallotPrice()

  const {
    data: isInitialized,
    isAccountInitialized,
    initializeAccount
  } = useAccount(user!)

  const { loading: facuetIsLoading, run: requestTokenRun } = useRequest(
    requestToken,
    {
      manual: true,
      throwOnError: true,
      onSuccess: (data: IResponse) => {
        if (data.errorMessage) {
          alert(data.errorMessage)
        } else {
          alert('get 1000 ccsToken success')
        }
      },
      onError: (err: any) => {
        alert(err)
      }
    }
  )

  const { error, loading, run, address, userName, discord, votingPower } =
    useUserDetail(user!)

  useEffect(() => {
    if (isLogIn) {
      console.log(`checking ${user?.addr} isAccountInitialized`)
      isAccountInitialized()
    }
  }, [isLogIn])

  useEffect(() => {
    if (openUserDetail) {
      getCCSBalance()
      getHodings()
      getPrice()
    }
  }, [openUserDetail])

  const handleBuyBallots = async (count: number) => {
    await buyBallots(count)
    await getHodings()
    await getCCSBalance()
  }

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
            isMainnet={import.meta.env.VITE_IS_MAINNET === 'true'}
            isFaucetLoading={facuetIsLoading ?? false}
            onUserDetailClick={() => {
              run(user)
              showUserDetail()
            }}
            onCreateClick={() => (window.location.href = '/create-activity')}
            onFaucetClick={() => {
              requestTokenRun(user.addr!)
            }}
          />
          <UserDetail
            address={address!}
            userName={userName ?? 'not set'}
            ballotAmount={ballotsAmount}
            ballotPrice={ballotPrice}
            votingPower={votingPower}
            tokenAmount={ccsTokenAmount}
            open={openUserDetail}
            onBuyClick={handleBuyBallots}
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
          onSetUpClick={() => {
            initializeAccount()
          }}
        />
      )}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
