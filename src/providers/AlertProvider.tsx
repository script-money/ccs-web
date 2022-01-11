import React, { useReducer, useContext, createContext } from 'react'
import {
  alertReducer,
  initialAlertState,
  AlertAction,
  AlertsState
} from '../reducer/alertReducer'
import { Alerts } from '../components/Alerts'

export const AlertContext = createContext<{
  state: AlertsState
  dispatch: React.Dispatch<AlertAction>
}>({
  state: initialAlertState,
  dispatch: () => undefined
})

export default function AlertProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(alertReducer, initialAlertState)

  return (
    <AlertContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
      <Alerts status={state.alertType} message={state.message}></Alerts>
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  return useContext(AlertContext)
}
