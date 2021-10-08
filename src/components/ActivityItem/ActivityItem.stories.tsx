import React from 'react'
import { Story, Meta } from '@storybook/react'

import { ActivityItem, ActivityItemProps } from '.'

export default {
  title: 'Project/ActivityItem',
  component: ActivityItem,
  argTypes: {
    onEnter: {
      action: 'getActivityById'
    }
  }
} as Meta

const Template: Story<ActivityItemProps> = args => <ActivityItem {...args} />

export const Open = Template.bind({})
Open.args = {
  activity: {
    id: 4,
    createdAt: '2021-10-05T02:25:25.229Z',
    title: 'Handcrafted Cotton Towels',
    metadata: {
      source: 'http://jordy.net',
      content:
        'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
      endDate: '2022-03-24T13:35:46.017Z',
      startDate: '2021-01-28T01:46:46.400Z',
      categories: ['Vote']
    },
    closed: false,
    creator: {
      address: '0x179b6b1cb6755e31',
      discord: null,
      avatar: null,
      flowns: null,
      name: null,
      votingPower: 1
    }
  }
} as ActivityItemProps

// export const Closed = Template.bind({})
// Closed.args = {
//   ...Open.args,
//   closed: true
// }
