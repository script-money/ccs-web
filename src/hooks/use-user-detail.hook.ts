import React from 'react'
import { SessionUser } from './use-current-user.hook'
import useCCSToken from './use-ccs-token.hook'
import { useRequest } from 'ahooks'
import { getUser } from '../api/server'
import useBallot from './use-ballot.hook'

export default function useUserDetail(user: SessionUser) {
  const { data: ccsTokenAmount } = useCCSToken(user)
  const { data: ballotAmount } = useBallot(user)

  const { data, error, loading, run } = useRequest(getUser, {
    manual: true,
    throttleInterval: 500,
    throwOnError: true
  })

  return {
    error,
    loading,
    run,
    address: user !== undefined ? user!.addr : '',
    userName: user !== undefined ? data?.data?.name : '',
    discord: user !== undefined ? data?.data?.discord : '',
    votingPower: user !== undefined ? data?.data?.votingPower : -1,
    ccsToken: user !== undefined ? ccsTokenAmount : -1,
    ballots: user !== undefined ? ballotAmount : -1
  }
}
