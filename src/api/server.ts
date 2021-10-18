import axios from 'axios'
import { SessionUser } from '../hooks/use-current-user.hook'
import { categoriesType, IGetActivitiesResponse } from '../interface/activity'
import { IGetUserResponse } from '../interface/user'

const BASE_URL = 'http://localhost:7005/api'

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
  return await axios.get(`${BASE_URL}/user/${user.addr}`)
}
