import { useEffect, useReducer } from 'react'
import { query, mutate, tx } from '@onflow/fcl'
import { defaultReducer } from '../reducer/defaultReducer'
import { SessionUser } from './use-current-user.hook'
import { GET_HODINGS } from '../flow/get-holdings.script'
import { BUY_BALLOTS } from '../flow/buy-ballots.tx'
import { useTxs } from '../providers/TxsProvider'

export default function useBallot(user: SessionUser | undefined) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })

  // const { addTx } = useTxs()

  const getHodings = async () => {
    dispatch({ type: 'PROCESSING' })

    try {
      const response = await query({
        cadence: GET_HODINGS,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)]
      })
      dispatch({ type: 'SUCCESS', payload: response })
    } catch (err) {
      dispatch({ type: 'ERROR' })
    }
  }

  const buyBallots = async (count: number) => {
    dispatch({ type: 'PROCESSING' })
    try {
      const transaction = await mutate({
        cadence: BUY_BALLOTS,
        limit: 100,
        args: (arg: any, t: any) => [arg(count, t.Int)]
      })
      // addTx!(transaction)
      await tx(transaction).onceSealed()
      dispatch({ type: 'SUCCESS' })
    } catch (err) {
      dispatch({ type: 'ERROR' })
    }
  }

  return {
    ...state,
    getHodings,
    buyBallots
  }
}
