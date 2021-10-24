import React, { useEffect, useReducer, useContext, createContext } from 'react'
import { TxInfo } from '../components/TxInfo'
import usePrevious from '../hooks/use-previous.hook'

import {
  txReducer,
  initialTxState,
  TxActions,
  TxState,
  ActionType
} from '../reducer/txReducer'
import { TxDetail } from '../components/TxDetail'

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
    if (previousStatus === ActionType.AddProccesing) {
      timer = setTimeout(() => dispatch({ type: ActionType.Reset }), 5000)
    }
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {state.txStatusType === 'TIP' ? (
        <TxDetail
          id={state.id}
          status={'SUCCESS'}
          notification={state.notification!}
          onConfirm={() => {
            if (state.toHome) {
              window.location.href = '/'
            } else {
              window.location.reload()
            }
            dispatch({ type: ActionType.Reset })
          }}
        ></TxDetail>
      ) : (
        <></>
      )}
    </TxContext.Provider>
  )
}

export const useTx = () => {
  return useContext(TxContext)
}
