import { mutate, tx, currentUser } from '@onflow/fcl'
import { VOTE } from '../flow/vote.tx'
import { CREATE_ACTIVITY } from '../flow/create-activity.tx'
import useCCSToken from './use-ccs-token.hook'
import { useAuth } from '../providers/AuthProvider'
import { useTx } from '../providers/TxProvider'
import { ActionType } from '../reducer/txReducer'
import useRemoteAuthz from './use-remote-authz.hook'
import { compositeSignature } from '../interface/flow'

export default function useActivity() {
  const { user } = useAuth()
  const { getCCSBalance } = useCCSToken(user!)
  const [remoteAuthz, errorMessage] = useRemoteAuthz()

  const { dispatch: txDispatch } = useTx()

  const vote = async (activityId: number, isUpVote: boolean) => {
    txDispatch({ type: ActionType.AddSigning })
    try {
      const transaction = await mutate({
        cadence: VOTE,
        limit: 100,
        args: (arg: any, t: any) => [
          arg(activityId, t.UInt64),
          arg(isUpVote, t.Bool)
        ],
        payer: remoteAuthz
      })
      txDispatch({ type: ActionType.AddProccesing })
      await tx(transaction).onceExecuted()
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
    } catch (err: unknown) {
      txDispatch({
        type: ActionType.AddError,
        payload: {
          error: errorMessage ?? (err as Error).message ?? (err as string)
        }
      })
    }
  }

  const createActivity = async (title: string, metadata: string) => {
    txDispatch({ type: ActionType.AddSigning })
    try {
      const transaction = await mutate({
        cadence: CREATE_ACTIVITY,
        limit: 100,
        args: (arg: any, t: any) => [
          arg(title, t.String),
          arg(metadata, t.String)
        ],
        payer: remoteAuthz
      })
      txDispatch({ type: ActionType.AddProccesing })
      await tx(transaction).onceExecuted()
      txDispatch({
        type: ActionType.AddSuccess,
        payload: { txID: transaction }
      })
      txDispatch({
        type: ActionType.AddTip,
        payload: {
          text: 'Activity will show in 1 minute',
          toHome: false
        }
      })
      await getCCSBalance()
    } catch (err: unknown) {
      txDispatch({
        type: ActionType.AddError,
        payload: {
          error: errorMessage ?? (err as Error).message ?? (err as string)
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
    vote,
    createActivity,
    updateActivitySign
  }
}
