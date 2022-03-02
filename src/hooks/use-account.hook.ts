import { defaultReducer } from '../reducer/defaultReducer'
import { useReducer } from 'react'
import { query, mutate, tx } from '@onflow/fcl'
import { SessionUser } from './use-current-user.hook'
import { IS_ACCOUNT_INITIALIZED } from '../flow/is_account_initialized.script'
import { INITIALIZED_ACCOUNT } from '../flow/initialized-account.tx'
import { useLocalStorageState } from 'ahooks'
import { useTx } from '../providers/TxProvider'
import { ActionType } from '../reducer/txReducer'
import useRemoteAuthz from './use-remote-authz.hook'

export default function useAccount(user: SessionUser) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })

  const [remoteAuthz, errorMessage] = useRemoteAuthz()

  const { dispatch: txDispatch } = useTx()

  const [accountInitStatus, setAccountInitStatus] = useLocalStorageState<{
    [address: string]: boolean
  }>('accountInitStatus')

  const isAccountInitialized = async () => {
    if (
      user !== undefined &&
      accountInitStatus != undefined &&
      user!.addr !== undefined &&
      accountInitStatus![user!.addr!] === true
    ) {
      console.log(user!.addr, 'already initiate')
      dispatch({ type: 'SUCCESS', payload: true })
      return
    }

    dispatch({ type: 'PROCESSING' })

    try {
      const response = await query({
        cadence: IS_ACCOUNT_INITIALIZED,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)]
      })
      dispatch({ type: 'SUCCESS', payload: response })
      return response as boolean
    } catch (err) {
      dispatch({ type: 'ERROR' })
    }
  }

  const initializeAccount = async () => {
    txDispatch({ type: ActionType.AddSigning })
    try {
      const transaction = await mutate({
        cadence: INITIALIZED_ACCOUNT,
        limit: 100,
        payer: remoteAuthz
      })
      txDispatch({ type: ActionType.AddProccesing })
      await tx(transaction).onceExecuted()
      const newStorageUsers = { ...accountInitStatus, [user!.addr!]: true }
      setAccountInitStatus(newStorageUsers)
      txDispatch({
        type: ActionType.AddSuccess,
        payload: { txID: transaction }
      })
      await isAccountInitialized()
      txDispatch({
        type: ActionType.AddTip,
        payload: {
          text: 'Account has been initialized',
          toHome: true
        }
      })
    } catch (err: unknown) {
      txDispatch({
        type: ActionType.AddError,
        payload: {
          error: errorMessage ?? (err as Error).message ?? (err as string)
        }
      })
    }
  }

  return {
    ...state,
    isAccountInitialized,
    initializeAccount
  }
}
