export type defaultStatus = 'PROCESSING' | 'SUCCESS' | 'ERROR'

type Action = {
  type: defaultStatus
  payload?: any
}

export const defaultReducer = (state: { data?: any }, action: Action) => {
  switch (action.type) {
    case 'PROCESSING':
      return {
        ...state,
        loading: true,
        error: false
      }
    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload
      }
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      throw new Error()
  }
}
