import { useReducer } from 'react'
import { GET_CCS_BALANCE } from '../flow/get-ccs-balance.script'
import { defaultReducer } from '../reducer/defaultReducer'
import { query } from '@onflow/fcl'
import { SessionUser } from './use-current-user.hook'

export default function useCCSToken(user: SessionUser | undefined) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })

  const getCCSBalance = async () => {
    dispatch({ type: 'PROCESSING' })

    try {
      const response = await query({
        cadence: GET_CCS_BALANCE,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)]
      })
      dispatch({ type: 'SUCCESS', payload: response })
    } catch (err) {
      dispatch({ type: 'ERROR' })
    }
  }

  return {
    ...state,
    getCCSBalance
  }
}
