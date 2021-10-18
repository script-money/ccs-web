import { IResponse } from './util'

export interface IGetUserResponse extends IResponse {
  success: boolean
  data: UserData | null
}

export interface UserData {
  address: string
  discord: string | null
  avatar: string | null
  flowns: string | null
  name: string | null
  votingPower: number
}
