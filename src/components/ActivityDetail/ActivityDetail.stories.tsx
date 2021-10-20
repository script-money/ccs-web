import React from 'react'
import { Story, Meta } from '@storybook/react'

import ActivityDetail from '.'
import { ActivityDetailProps } from '../../interface/activity'

export default {
  title: 'Project/ActivityDetail',
  component: ActivityDetail,
  argTypes: {
    onVote: {
      action: 'vote'
    }
  }
} as Meta

const Template: Story<ActivityDetailProps> = args => (
  <ActivityDetail {...args} />
)

export const Close = Template.bind({})
Close.args = {
  activity: {
    id: 0,
    createdAt: '2021-10-19T02:08:28.411Z',
    updatedAt: '2021-10-19T02:08:32.951Z',
    title: 'ICPSquad的邮件订阅',
    metadata: {
      source: null,
      content: '活动已经结束',
      endDate: '2021-10-05T01:00:00.000Z',
      startDate: '2021-09-22T01:00:00.000Z',
      categories: ['Register', 'Whitelist']
    },
    creatorAddr: '0x179b6b1cb6755e31',
    content: '活动已经结束',
    startDate: '2021-09-22T01:00:00.000Z',
    endDate: '2021-10-05T01:00:00.000Z',
    source: null,
    lockDate: '2021-10-20T02:08:28.651Z',
    upVote: 2,
    downVote: 2,
    closed: true,
    rewardToken: 0,
    absTotalPower: 2,
    bouns: 0.01,
    voteResult: [
      {
        id: 1,
        voterAddr: '0x179b6b1cb6755e31',
        isUpVote: true,
        power: 1,
        activityId: 0
      },
      {
        id: 2,
        voterAddr: '0xf3fcd2c1a78f5eee',
        isUpVote: true,
        power: 1,
        activityId: 0
      },
      {
        id: 3,
        voterAddr: '0xe03daebed8ca0615',
        isUpVote: false,
        power: 1,
        activityId: 0
      },
      {
        id: 4,
        voterAddr: '0x045a1763c93006ca',
        isUpVote: false,
        power: 1,
        activityId: 0
      }
    ],
    creator: {
      address: '0x179b6b1cb6755e31',
      discord: null,
      avatar: null,
      flowns: null,
      name: null,
      votingPower: 1
    }
  }
} as ActivityDetailProps

export const Open = Template.bind({})
Open.args = {
  activity: {
    id: 12,
    createdAt: '2021-10-19T02:08:29.245Z',
    updatedAt: '2021-10-19T02:08:29.245Z',
    title: 'Handcrafted Frozen Chair',
    metadata: {
      source:
        'https://www.google.com.hk/search?q=flex+after+wrap+end+css&newwindow=1&sxsrf=AOaemvLplBtbObIVCSB4wgSLfVQj1ZcgFA%3A1634634806577&ei=NoxuYY7aIsuGr7wPyOadoA4&ved=0ahUKEwiOze6XkdbzAhVLw4sBHUhzB-QQ4dUDCA4&uact=5&oq=flex+after+wrap+end+css&gs_lcp=Cgdnd3Mtd2l6EAMyBQghEKABSgQIQRgBUP0CWOUHYO4HaABwAHgAgAGBAogBgQSSAQMyLTKYAQCgAQHAAQE&sclient=gws-wiz',
      content:
        'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
      endDate: '2022-03-04T18:35:09.374Z',
      startDate: '2021-06-15T03:07:46.912Z',
      categories: ['IXO']
    },
    creatorAddr: '0x179b6b1cb6755e31',
    content:
      'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
    startDate: '2021-06-15T03:07:46.912Z',
    endDate: '2022-03-04T18:35:09.374Z',
    source:
      'https://www.google.com.hk/search?q=flex+after+wrap+end+css&newwindow=1&sxsrf=AOaemvLplBtbObIVCSB4wgSLfVQj1ZcgFA%3A1634634806577&ei=NoxuYY7aIsuGr7wPyOadoA4&ved=0ahUKEwiOze6XkdbzAhVLw4sBHUhzB-QQ4dUDCA4&uact=5&oq=flex+after+wrap+end+css&gs_lcp=Cgdnd3Mtd2l6EAMyBQghEKABSgQIQRgBUP0CWOUHYO4HaABwAHgAgAGBAogBgQSSAQMyLTKYAQCgAQHAAQE&sclient=gws-wiz',
    lockDate: '2021-10-20T18:35:09.374Z',
    upVote: 1,
    downVote: 0,
    closed: false,
    rewardToken: 120.21029921,
    absTotalPower: 723.2,
    bouns: 0.22123,
    creator: {
      address: '0x179b6b1cb6755e31',
      discord: null,
      avatar: null,
      flowns: null,
      name: null,
      votingPower: 1
    }
  },
  currentUserAddr: '0x179b6b1cb6755e00'
} as ActivityDetailProps

export const Voted = Template.bind({})
Voted.args = {
  ...Open.args,
  currentUserAddr: '0x179b6b1cb6755e31'
}
