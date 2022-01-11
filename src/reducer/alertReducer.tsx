export enum AlertType {
  Success = 'SUCCESS',
  Error = 'ERROR',
  None = 'NONE'
}

export interface AlertsState {
  alertType: AlertType
  error: boolean
  message: string
}

export const initialAlertState: AlertsState = {
  alertType: AlertType.None,
  error: false,
  message: ''
}

interface AddSuccess {
  alertType: AlertType.Success
  message: string
}

interface AddError {
  alertType: AlertType.Error
  message: string
}

interface Reset {
  alertType: AlertType.None
}

export type AlertAction = AddSuccess | AddError | Reset

export const alertReducer = (state: AlertsState, action: AlertAction) => {
  switch (action.alertType) {
    case AlertType.Success:
      return {
        ...state,
        alertType: AlertType.Success,
        error: false,
        message: action.message
      }
    case AlertType.Error:
      return {
        ...state,
        alertType: AlertType.Error,
        error: true,
        message: action.message
      }
    default:
      return {
        alertType: AlertType.None,
        error: false,
        message: ''
      }
  }
}
