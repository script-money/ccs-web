import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UpdateActivityForm } from '.'

export default {
  title: 'Project/UpdateActivityForm',
  component: UpdateActivityForm,
  argTypes: {
    onSubmit: {
      action: 'updateActivity'
    }
  }
} as ComponentMeta<typeof UpdateActivityForm>

const Template: ComponentStory<typeof UpdateActivityForm> = args => (
  <UpdateActivityForm {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  activity: {
    id: 4,
    createdAt: '2021-10-05T02:25:25.229Z',
    updatedAt: '2021-10-05T02:25:25.229Z',
    endDate: null,
    startDate: '2021-01-28T01:46:46.400Z',
    lockDate: '2021-01-28T01:46:46.400Z',
    creatorAddr: '0xe03daebed8ca0615',
    title: 'Handcrafted Cotton Towels',
    source: 'http://jordy.net',
    content:
      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
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
    },
    upVote: 1,
    downVote: 0,
    rewardToken: 100,
    absTotalPower: 0.01,
    bouns: 0.001
  }
}
