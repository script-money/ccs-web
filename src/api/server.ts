import axios from 'axios'
import { BASE_URL } from '../config/config'
import { SessionUser } from '../hooks/use-current-user.hook'
import {
  categoriesType,
  IGetActivitiesResponse,
  IGetActivityResponse
} from '../interface/activity'
import { IGetUserResponse } from '../interface/user'

export const getActivityList = async (
  current: number,
  pageSize: number,
  type?: categoriesType,
  canVote?: boolean,
  canJoin?: boolean,
  createBy?: string
): Promise<IGetActivitiesResponse> => {
  const result = await axios.get(`${BASE_URL}/activity`, {
    params: {
      limit: pageSize,
      offset: pageSize * (current - 1),
      type,
      canVote,
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
