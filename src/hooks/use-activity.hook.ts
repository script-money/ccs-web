import { useEffect, useReducer } from 'react'
import { query, mutate, tx } from '@onflow/fcl'
import { defaultReducer } from '../reducer/defaultReducer'
import { useTxs } from '../providers/TxsProvider'
import { GET_CREATE_CONSUMPTION } from '../flow/get_create_consumption.script'
import { VOTE } from '../flow/vote.tx'
import { CREATE_ACTIVITY } from '../flow/create-activity.tx'
import useCCSToken from './use-ccs-token.hook'
import { useAuth } from '../providers/AuthProvider'

export default function useActivity() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })

  const { user } = useAuth()
  const { addTx } = useTxs()
  const { getCCSBalance } = useCCSToken(user!)

  useEffect(() => {
    getConsumption()
    //eslint-disable-next-line
  }, [])

  const getConsumption = async () => {
    dispatch({ type: 'PROCESSING' })
    console.log('getConsumption start')

    try {
      const response = await query({
        cadence: GET_CREATE_CONSUMPTION
      })
      dispatch({ type: 'SUCCESS', payload: response })
      console.log('getConsumption end', response)
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  const vote = async (activityId: number, isUpVote: boolean) => {
    dispatch({ type: 'PROCESSING' })
    try {
      const transaction = await mutate({
        cadence: VOTE,
        limit: 100,
        args: (arg: any, t: any) => [
          arg(activityId, t.UInt64),
          arg(isUpVote, t.Bool)
        ]
      })
      addTx!(transaction)
      await tx(transaction).onceSealed()
      dispatch({ type: 'SUCCESS' })
    } catch (err) {
      console.log(err)
      dispatch({ type: 'ERROR' })
    }
  }

  const createActivity = async (title: string, metadata: string) => {
    dispatch({ type: 'PROCESSING' })
    try {
      const transaction = await mutate({
        cadence: CREATE_ACTIVITY,
        limit: 100,
        args: (arg: any, t: any) => [
          arg(title, t.String),
          arg(metadata, t.String)
        ]
      })
      addTx!(transaction)
      await tx(transaction).onceSealed()
      dispatch({ type: 'SUCCESS' })
      console.log('getCCSBalance')
      await getCCSBalance()
    } catch (err) {
      console.log(err)
      dispatch({ type: 'ERROR' })
    }
  }

  return {
    ...state,
    getConsumption,
    vote,
    createActivity
  }
}
