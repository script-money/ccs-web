import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CalendarView } from '.'

export default {
  title: 'Project/CalendarView',
  component: CalendarView,
  argTypes: {
    onDateClick: {
      action: 'swithDate'
    }
  }
} as ComponentMeta<typeof CalendarView>

const Template: ComponentStory<typeof CalendarView> = args => (
  <CalendarView {...args} />
)

export const Default = Template.bind({})

Default.args = {
  data: [
    {
      id: 11,
      title: 'test3',
      endDate: null,
      content: 'sdfsdf',
      source: '',
      categories: ['Other']
    },
    {
      id: 104,
      title: 'abcdefghijklmnopqrstuvwxyz012345',
      endDate: '2022-02-24T16:00:00.000Z',
      content:
        'sdfsdffsdkgjfskjenfjksndfksjdnfkjsndfknsdkfjdsnkj粉丝看到女u看到女肯看🤖',
      source:
        'https://stackoverflow.com/questions/15993913/format-date-with-moment-js',
      categories: ['LuckDraw', 'Learn', 'Node', 'Test']
    },
    {
      id: 31,
      title: '一二三四五六七八一二三四五六七八',
      endDate: null,
      content: '',
      source: '',
      categories: ['LuckDraw', 'Learn']
    }
  ]
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  data: [],
  isLoading: true
}

export const Empty = Template.bind({})
Empty.args = {
  ...Loading.args,
  data: [],
  isLoading: false
}
