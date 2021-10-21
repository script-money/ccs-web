import React, { useEffect, useReducer, useContext, createContext } from 'react'
import { TxInfo } from '../components/TxInfo'
import usePrevious from '../hooks/use-previous.hook'
import { useTimeout } from 'ahooks'

import {
  txReducer,
  initialTxState,
  TxActions,
  TxState,
  ActionType
} from '../reducer/txReducer'

export const TxContext = createContext<{
  state: TxState
  dispatch: React.Dispatch<TxActions>
}>({
  state: initialTxState,
  dispatch: () => undefined
})

export default function TxProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(txReducer, initialTxState)

  const previousStatus = usePrevious(state.txStatusType)

  useEffect(() => {
    let timer: any
    if (
      previousStatus === ActionType.AddProccesing &&
      state.txStatusType === ActionType.AddSuccess
    ) {
      timer = setTimeout(() => dispatch({ type: ActionType.Reset }), 5000)
    }
    return () => clearTimeout(timer)
  }, [state.txStatusType])

  return (
    <TxContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
      <TxInfo
        id={state.id}
        errorMessage={state.errorMessage}
        status={state.txStatusType}
        show={state.txStatusType !== 'NONE' && state.txStatusType !== undefined}
        setShow={() => dispatch({ type: ActionType.Reset })}
      ></TxInfo>
    </TxContext.Provider>
  )
}

export const useTx = () => {
  return useContext(TxContext)
}
