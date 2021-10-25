import { categoriesType } from './activity'
import { IResponse } from './util'

export interface MemorialsData {
  id: number
  ownerAddress: string
  activity: {
    id: number
    title: string
    startDate: string | null
    endDate: string | null
    categories: {
      category: {
        type: categoriesType
      }
    }[]
  }
  seriesNumber: number
  circulatingCount: number
  mintedAt: moment.Moment | string
  isPositive: boolean
  bonus: number
}

export interface IGetMemorialsResponse extends IResponse {
  success: boolean
  data: MemorialsData[] | null
}
