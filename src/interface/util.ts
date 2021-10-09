export interface IResponse {
  success: boolean // if request is success
  data?: any // response data
  errorCode?: number // code for errorType
  errorMessage?: string // message display to user
  showType?: number // error display type： 0 silent; 1 message.warn; 2 message.error
}
