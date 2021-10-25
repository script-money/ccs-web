import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Memorial } from '.'

export default {
  title: 'Project/Memorial',
  component: Memorial
} as ComponentMeta<typeof Memorial>

const Template: ComponentStory<typeof Memorial> = args => <Memorial {...args} />

export const POSITIVE = Template.bind({})
POSITIVE.args = {
  data: {
    id: 2,
    ownerAddress: '0xf3fcd2c1a78f5eee',
    activity: {
      id: 1,
      title: 'mercury hackathon 2021',
      startDate: '2021-10-01T11:24:00.075Z',
      endDate: '2021-10-28T11:24:00.075Z',
      categories: [
        {
          category: {
            type: 'Develop'
          }
        }
      ]
    },
    seriesNumber: 2,
    circulatingCount: 3,
    mintedAt: '2021-10-25T11:24:00.075Z',
    isPositive: true,
    bonus: 0.01
  }
}

export const NEGATIVE = Template.bind({})
NEGATIVE.args = {
  data: {
    id: 1,
    ownerAddress: '0xf3fcd2c1a78f5eee',
    activity: {
      id: 0,
      title: '1',
      startDate: '2021-10-01T11:24:00.075Z',
      endDate: null,
      categories: [
        {
          category: {
            type: 'Test'
          }
        },
        {
          category: {
            type: 'Register'
          }
        }
      ]
    },
    seriesNumber: 212,
    circulatingCount: 323,
    mintedAt: '2021-10-25T11:24:00.075Z',
    isPositive: false,
    bonus: 0.01
  }
}
