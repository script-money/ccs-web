import { useEffect, useReducer } from 'react'
import { defaultReducer } from '../reducer/defaultReducer'
import { query, mutate, tx } from '@onflow/fcl'
import { useTxs } from '../providers/TxsProvider'
import { SessionUser } from './use-current-user.hook'
import { IS_ACCOUNT_INITIALIZED } from '../flow/is_account_initialized.script'
import { INITIALIZED_ACCOUNT } from '../flow/initialized-account.tx'

export default function useAccount(user: SessionUser) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })
  const { addTx } = useTxs()

  useEffect(() => {
    isAccountInitialized()
    //eslint-disable-next-line
  }, [])

  const isAccountInitialized = async () => {
    dispatch({ type: 'PROCESSING' })

    try {
      const response = await query({
        cadence: IS_ACCOUNT_INITIALIZED,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)]
      })
      dispatch({ type: 'SUCCESS', payload: response })
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  const initializeAccount = async () => {
    dispatch({ type: 'PROCESSING' })
    try {
      const transaction = await mutate({
        cadence: INITIALIZED_ACCOUNT,
        limit: 100
      })
      addTx!(transaction)
      await tx(transaction).onceSealed()
      dispatch({ type: 'SUCCESS' })
    } catch (err) {
      dispatch({ type: 'ERROR' })
    }
  }

  return {
    ...state,
    initializeAccount,
    isAccountInitialized
  }
}
