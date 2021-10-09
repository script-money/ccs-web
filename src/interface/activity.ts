import { IResponse } from './util'

export interface IGetActivitiesResponse extends IResponse {
  data: ActivityData[]
  total: number
}

export interface IActivityListProps {
  isLoading: boolean
  activities: ActivityData[]
  total: number
  limit: number
  currentPage: number
  onQueryData?: (
    limit?: number,
    offset?: number,
    type?: string,
    canVote?: boolean,
    canJoin?: boolean,
    createBy?: string
  ) => void
}

export interface ActivityData {
  id: number
  title: string
  createdAt: moment.Moment | string
  startDate: moment.Moment | string
  endDate: moment.Moment | string
  metadata: {
    source: string | null
    content: string | null
    startDate: string | null
    endDate: string | null
    categories: categoriesType[]
  }
  closed: boolean
  creator: {
    address: string
    avatar: string | null
    discord: string | null
    flowns: string | null
    name: string | null
    votingPower: number
  }
}

export interface ActivityItemProps {
  activity: ActivityData
  onEnter?: (id: number) => void
}

export const categories = [
  { id: 0, type: 'All' },
  { id: 1, type: 'Interact' },
  { id: 2, type: 'Form' },
  { id: 3, type: 'Vote' },
  { id: 4, type: 'Test' },
  { id: 5, type: 'Node' },
  { id: 6, type: 'Learn' },
  { id: 7, type: 'Create' },
  { id: 8, type: 'Develop' },
  { id: 9, type: 'Whitelist' },
  { id: 10, type: 'IXO' },
  { id: 11, type: 'LuckDraw' },
  { id: 12, type: 'Register' },
  { id: 13, type: 'Airdrop' }
]

export type categoriesType =
  | 'All'
  | 'Interact'
  | 'Form'
  | 'Vote'
  | 'Test'
  | 'Node'
  | 'Learn'
  | 'Create'
  | 'Develop'
  | 'Whitelist'
  | 'IXO'
  | 'LuckDraw'
  | 'Register'
  | 'Airdrop'

export interface ICategoryType {
  id: number
  type: categoriesType
}
