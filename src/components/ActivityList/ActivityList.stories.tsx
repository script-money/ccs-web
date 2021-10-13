import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ActivityList, IActivityListProps } from '.'
import * as ActivityItemStories from '../ActivityItem/ActivityItem.stories'

export default {
  title: 'Project/ActivityList',
  component: ActivityList,
  argTypes: {
    changeCurrent: {
      action: 'changeActivityPage'
    },
    changeCanVoteState: {
      action: 'changeCanVoteState'
    },
    changeCanJoinState: {
      action: 'changeCanJoinState'
    },
    changeSelectType: {
      action: 'changeSelectType'
    }
  }
} as Meta

const Template: Story<IActivityListProps> = args => <ActivityList {...args} />

export const Default = Template.bind({})

Default.args = {
  activities: [
    {
      ...ActivityItemStories.Open.args!.activity!,
      id: 1
    },
    {
      ...ActivityItemStories.Open.args!.activity!,
      id: 2,
      closed: true
    },
    {
      ...ActivityItemStories.Open.args!.activity!,
      id: 3
    },
    {
      ...ActivityItemStories.Open.args!.activity!,
      id: 4,
      closed: true
    },
    {
      ...ActivityItemStories.Open.args!.activity!,
      id: 5
    }
  ],
  total: 23,
  pageSize: 5,
  currentPage: 2,
  selectedCategory: {
    id: 0,
    type: 'All'
  }
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  activities: [],
  isLoading: true
}

export const Empty = Template.bind({})
Empty.args = {
  ...Loading.args,
  activities: [],
  isLoading: false
}
