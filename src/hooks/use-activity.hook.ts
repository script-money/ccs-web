import { useEffect, useReducer } from 'react'
import { query, mutate, tx, currentUser } from '@onflow/fcl'
import { defaultReducer } from '../reducer/defaultReducer'
import { GET_CREATE_CONSUMPTION } from '../flow/get_create_consumption.script'
import { VOTE } from '../flow/vote.tx'
import { CREATE_ACTIVITY } from '../flow/create-activity.tx'
import useCCSToken from './use-ccs-token.hook'
import { useAuth } from '../providers/AuthProvider'
import { useTx } from '../providers/TxProvider'
import { ActionType } from '../reducer/txReducer'
import useRemoteAuthz from './use-remote-authz.hook'
import { compositeSignature } from '../interface/flow'

export default function useActivity() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })

  const { user } = useAuth()
  const { getCCSBalance } = useCCSToken(user!)
  const [remoteAuthz, errorMessage] = useRemoteAuthz()

  const { state: txState, dispatch: txDispatch } = useTx()

  useEffect(() => {
    getConsumption()
    //eslint-disable-next-line
  }, [])

  const getConsumption = async () => {
    dispatch({ type: 'PROCESSING' })

    try {
      const response = await query({
        cadence: GET_CREATE_CONSUMPTION
      })
      dispatch({ type: 'SUCCESS', payload: response })
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  const vote = async (activityId: number, isUpVote: boolean) => {
    txDispatch({ type: ActionType.AddProccesing })
    try {
      const transaction = await mutate({
        cadence: VOTE,
        limit: 100,
        args: (arg: any, t: any) => [
          arg(activityId, t.UInt64),
          arg(isUpVote, t.Bool)
        ],
        payer: import.meta.env.MODE === 'development' ? undefined : remoteAuthz
      })
      await tx(transaction).onceSealed()
      txDispatch({
        type: ActionType.AddSuccess,
        payload: { txID: transaction }
      })
      txDispatch({
        type: ActionType.AddTip,
        payload: {
          // eslint-disable-next-line prettier/prettier
          text: `You have vote ${isUpVote ? '👍' : '👎'
            // eslint-disable-next-line prettier/prettier
            } for activity # ${activityId}`,
          toHome: true
        }
      })
    } catch (err) {
      txDispatch({
        type: ActionType.AddError,
        payload: {
          error: errorMessage!
        }
      })
    }
  }

  const createActivity = async (title: string, metadata: string) => {
    txDispatch({ type: ActionType.AddProccesing })
    try {
      const transaction = await mutate({
        cadence: CREATE_ACTIVITY,
        limit: 100,
        args: (arg: any, t: any) => [
          arg(title, t.String),
          arg(metadata, t.String)
        ],
        payer: import.meta.env.MODE === 'development' ? undefined : remoteAuthz
      })
      await tx(transaction).onceSealed()
      txDispatch({
        type: ActionType.AddSuccess,
        payload: { txID: transaction }
      })
      await getCCSBalance()
      txDispatch({
        type: ActionType.AddTip,
        payload: {
          text: 'Activity will show in 1 minute',
          toHome: false
        }
      })
    } catch (err) {
      txDispatch({
        type: ActionType.AddError,
        payload: {
          error: errorMessage!
        }
      })
    }
  }

  const updateActivitySign = async (metadata: string) => {
    try {
      const MSG = Buffer.from(metadata).toString('hex')
      const signatures: [compositeSignature] =
        await currentUser().signUserMessage(MSG)
      return { message: metadata, signature: signatures }
    } catch (error) {
      console.warn('updateActivitySign', error)
    }
  }

  return {
    ...state,
    getConsumption,
    vote,
    createActivity,
    updateActivitySign
  }
}
