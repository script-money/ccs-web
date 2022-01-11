import axios from 'axios'
import { BASE_URL } from '../config/config'
import { SessionUser } from '../hooks/use-current-user.hook'
import {
  categoriesType,
  IGetActivitiesResponse,
  IGetActivityResponse
} from '../interface/activity'
import { compositeSignature } from '../interface/flow'
import { IGetMemorialsResponse } from '../interface/memorials'
import { IGetUserResponse } from '../interface/user'
import { IResponse } from '../interface/util'

export const getActivityList = async (
  current: number,
  pageSize: number,
  type?: categoriesType,
  canVote?: boolean,
  address?: string,
  canJoin?: boolean,
  createBy?: string
): Promise<IGetActivitiesResponse> => {
  const result = await axios.get(`${BASE_URL}/activity`, {
    params: {
      limit: pageSize,
      offset: pageSize * (current - 1),
      type,
      canVote,
      address,
      canJoin,
      createBy
    }
  })
  return result.data
}

export const getUser = async (user: SessionUser): Promise<IGetUserResponse> => {
  const result = await axios.get(`${BASE_URL}/user/${user.addr}`)
  return result.data
}

export const getActivityDetail = async (
  activityId: number
): Promise<IGetActivityResponse> => {
  const result = await axios.get(`${BASE_URL}/activity/${activityId}`)
  return result.data
}

export const requestToken = async (addr: string): Promise<IResponse> => {
  const result = (await axios.post(
    `${BASE_URL}/token/free?address=${addr}`
  )) as IResponse
  return result.data
}

export const getMemorials = async (
  activityId: number,
  userAddress: string
): Promise<IGetMemorialsResponse> => {
  const result = await axios.get(`${BASE_URL}/memorials`, {
    params: {
      activityId,
      userAddress
    }
  })
  return result.data
}

export const updateActivity = async (
  id: number,
  message: string,
  compositeSignatures: compositeSignature[]
) => {
  const result = await axios.put(`${BASE_URL}/activity`, {
    id,
    message,
    compositeSignatures
  })
  return result.data
}

export const updateUser = async (code: string, state: string) => {
  const result = await axios.get(`${BASE_URL}/user/update-discord`, {
    params: {
      code,
      state
    }
  })
  return result.data
}
