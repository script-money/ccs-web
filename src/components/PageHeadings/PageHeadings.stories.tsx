import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PageHeadings } from '.'

export default {
  title: 'Project/PageHeadings',
  component: PageHeadings,
  argTypes: {
    onLogInClick: {
      action: 'logIn'
    }
  }
} as ComponentMeta<typeof PageHeadings>

const Template: ComponentStory<typeof PageHeadings> = args => (
  <PageHeadings {...args} />
)

export const NotLogIn = Template.bind({})
NotLogIn.args = {
  isLogin: false,
  address: null
}

export const LogIn = Template.bind({})
LogIn.args = {
  isLogin: true,
  address: '0xbe3dd040a44a36b3',
  ballots: 2,
  ccsToken: 21132.42343552
}
