import axios from 'axios'
import { categoriesType, IGetActivitiesResponse } from '../interface/activity'

const BASE_URL = 'http://localhost:7005'

export const getActivityList = async (
  current: number,
  pageSize: number,
  type?: categoriesType,
  canVote?: boolean,
  canJoin?: boolean,
  createBy?: string
): Promise<IGetActivitiesResponse> => {
  const result = await axios.get(`${BASE_URL}/api/activity`, {
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
