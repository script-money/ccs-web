import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ActivityItem } from '.'

export default {
  title: 'Project/ActivityItem',
  component: ActivityItem,
  argTypes: {}
} as ComponentMeta<typeof ActivityItem>

const Template: ComponentStory<typeof ActivityItem> = args => (
  <ActivityItem {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
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
