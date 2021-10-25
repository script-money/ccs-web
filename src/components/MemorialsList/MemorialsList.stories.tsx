import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import MemorialsList from '.'

export default {
  title: 'Project/MemorialsList',
  component: MemorialsList
} as ComponentMeta<typeof MemorialsList>

const Template: ComponentStory<typeof MemorialsList> = args => (
  <MemorialsList {...args} />
)

export const DEFAULT = Template.bind({})
DEFAULT.args = {
  data: [
    {
      id: 2,
      ownerAddress: '0xf3fcd2c1a78f5eee',
      activity: {
        id: 0,
        title: '1',
        startDate: '2021-10-01T11:24:00.075Z',
        endDate: '2021-10-28T11:24:00.075Z',
        categories: [
          {
            category: {
              type: 'Test'
            }
          }
        ]
      },
      seriesNumber: 2,
      circulatingCount: 3,
      mintedAt: '2021-10-25T11:24:00.075Z',
      isPositive: false,
      bonus: 0.01
    },
    {
      id: 145,
      ownerAddress: '0xf3fcd2c1a78f5eee',
      activity: {
        id: 1,
        title: 'mercury hckathon 2021',
        startDate: '2021-09-21T11:00:00.000Z',
        endDate: '2021-10-30T17:00:00.000Z',
        categories: [
          {
            category: {
              type: 'Develop'
            }
          },
          {
            category: {
              type: 'Register'
            }
          }
        ]
      },
      seriesNumber: 123,
      circulatingCount: 321,
      mintedAt: '2021-10-25T11:24:00.075Z',
      isPositive: true,
      bonus: 0.0523323
    }
  ]
}
