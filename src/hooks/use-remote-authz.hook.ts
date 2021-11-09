import { useRequest } from 'ahooks'
import React, { useState } from 'react'
import { BASE_URL } from '../config/config'
import { Account } from '../interface/flow'

export default function useRemoteAuthz(): [
  (account: Account) => Promise<Account> | undefined,
  string?
] {
  const [errorMessage, setErrorMessage] = useState<string>()

  const resolveAccountRequest = useRequest(
    (account: Account) => ({
      url: BASE_URL + '/resolve-account',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(account)
    }),
    {
      manual: true,
      onError: error => {
        setErrorMessage(error.message + ' /resolve-account')
      }
    }
  )

  const signatureFromServerRequest = useRequest(
    (signable: any) => ({
      url: BASE_URL + '/sign',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signable)
    }),
    {
      ready: !!resolveAccountRequest.data,
      onError: error => {
        setErrorMessage(error.message + ' /sign')
      }
    }
  )

  const remoteAuthz = async (account: Account) => {
    const resolvedAccount = await resolveAccountRequest.run(account)

    return {
      ...resolvedAccount,
      signingFunction: signatureFromServerRequest.run
    }
  }

  return [remoteAuthz, errorMessage]
}
