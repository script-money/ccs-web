import { useEffect, useState } from 'react'
import * as fcl from '@onflow/fcl'

export type SessionUser = {
  addr: string | null
  cid?: string | null
  expiresAt?: string | null
  f_type?: 'USER' | 'User'
  f_vsn?: '1.0.0'
  loggedIn: boolean | null
  services?: []
}

export default function useCurrentUser() {
  const [user, setUser] = useState<SessionUser>()

  useEffect(() => {
    let cancel = false
    if (!cancel) {
      fcl.currentUser().subscribe(setUser)
    }
    return () => {
      cancel = true
    }
  }, [])

  return {
    user,
    isLogIn: user?.addr != null,
    logIn: fcl.authenticate,
    logOut: fcl.unauthenticate
  }
}
