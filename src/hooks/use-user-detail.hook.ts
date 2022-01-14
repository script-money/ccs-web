import { SessionUser } from './use-current-user.hook'
import { useRequest } from 'ahooks'
import { getUser } from '../api/server'

export default function useUserDetail(user: SessionUser) {
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
    votingPower: user !== undefined ? data?.data?.votingPower : -1
  }
}
