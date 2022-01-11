import { formatError } from '../utils'

export enum ActionType {
  AddProccesing = 'PROCESSING',
  AddSuccess = 'SUCCESS',
  AddTip = 'TIP',
  AddError = 'ERROR',
  Reset = 'NONE'
}

export interface TxState {
  txStatusType: ActionType
  id?: string
  errorMessage?: string
  notification?: string
  toHome?: boolean
  isLoading: boolean
  isError: boolean
}

export const initialTxState: TxState = {
  txStatusType: ActionType.Reset,
  isLoading: false,
  isError: false
}

interface AddProccesing {
  type: ActionType.AddProccesing
}

interface AddSuccess {
  type: ActionType.AddSuccess
  payload: { txID: string }
}

interface AddTips {
  type: ActionType.AddTip
  payload: { text: string; toHome: boolean }
}

interface AddError {
  type: ActionType.AddError
  payload: { error: string }
}

interface Reset {
  type: ActionType.Reset
}

export type TxActions = AddProccesing | AddSuccess | AddTips | AddError | Reset

export const txReducer = (state: TxState, action: TxActions) => {
  switch (action.type) {
    case ActionType.AddProccesing:
      return {
        ...state,
        txStatusType: action.type,
        isLoading: true,
        isError: false
      }
    case ActionType.AddSuccess:
      return {
        ...state,
        txStatusType: action.type,
        id: action.payload.txID,
        isLoading: false,
        isError: false
      }
    case ActionType.AddTip:
      return {
        ...state,
        txStatusType: action.type,
        notification: action.payload.text,
        toHome: action.payload.toHome
      }
    case ActionType.AddError:
      return {
        ...state,
        txStatusType: action.type,
        errorMessage: formatError(action.payload.error),
        isLoading: false,
        isError: true
      }
    case ActionType.Reset:
      return {
        ...initialTxState,
        txStatusType: action.type
      }
    default:
      return {
        ...initialTxState,
        txStatusType: ActionType.Reset
      }
  }
}
