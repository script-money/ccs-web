import { IResponse } from './util'

export interface IGetActivitiesResponse extends IResponse {
  data: ActivityData[]
  total: number
}

export interface GetActivityParams {
  id: string
}

export interface IGetActivityResponse extends IResponse {
  data: ActivityData | null
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

interface VoteResult {
  id: number
  voterAddr: string
  isUpVote: boolean
  power: number
  activityId: number
}

export interface ActivityData {
  id: number
  title: string
  createdAt: moment.Moment | string
  updatedAt: moment.Moment | string
  startDate: moment.Moment | string
  endDate: moment.Moment | string | null
  metadata: {
    source: string | null
    content: string | null
    startDate: string | null
    endDate: string | null
    categories: categoriesType[]
  }
  creatorAddr: string
  content: string | null
  source: string | null
  lockDate: moment.Moment | string | null
  upVote: number
  downVote: number
  closed: boolean
  rewardToken: number | null
  absTotalPower: number | null
  bouns: number | null
  voteResult?: VoteResult[]
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

export interface ActivityDetailProps {
  activity: ActivityData
  currentUserAddr?: string
  onUpVote?: () => void
  onDownVote?: () => void
}

export const categories = [
  {
    id: 0,
    type: 'All',
    comment: 'All typeof activities'
  },
  {
    id: 1,
    type: 'Interact',
    comment: 'use product with no reward, for future airdrop'
  },
  { id: 2, type: 'Form', comment: 'do some task and fill form' },
  { id: 3, type: 'Vote', comment: 'voting for governance' },
  { id: 4, type: 'Test', comment: 'test product and report bug' },
  { id: 5, type: 'Node', comment: "run testnet node'" },
  { id: 6, type: 'Learn', comment: 'learn to earn' },
  { id: 7, type: 'Create', comment: 'create media, meme, aircle...' },
  { id: 8, type: 'Develop', comment: 'develop a product or module' },
  { id: 9, type: 'Whitelist', comment: 'join whitelist' },
  { id: 10, type: 'IXO', comment: 'join inital offerings' },
  { id: 11, type: 'LuckDraw', comment: 'join luckdraw' },
  {
    id: 12,
    type: 'Register',
    comment:
      'register join Discord,join telegram,create account,subcribe email,signUp website...'
  },
  {
    id: 13,
    type: 'Airdrop',
    comment: 'only use for activity/create_airdrop, not confuse with other'
  }
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
