import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UserDetail } from '.'

export default {
  title: 'Project/UserDetail',
  component: UserDetail,
  argTypes: {
    onBuyClick: {
      action: 'buyBallots'
    },
    onLogoutClick: {
      action: 'logout'
    },
    onLinkClick: {
      action: 'link Discord'
    }
  }
} as ComponentMeta<typeof UserDetail>

const Template: ComponentStory<typeof UserDetail> = args => (
  <UserDetail {...args} />
)

export const DEFAULT = Template.bind({})
DEFAULT.args = {
  address: '0xbe3dd040a44a36b3'
}

export const FULL = Template.bind({})
FULL.args = {
  ...DEFAULT.args,
  userName: 'scriptmoney#7183',
  ballotPrice: 1.12345678,
  ballotAmount: 34,
  votingPower: 1.532,
  tokenAmount: 123.12331442
}
