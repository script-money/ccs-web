import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TxInfo } from '.'
import { ActionType } from '../../reducer/txReducer'

export default {
  title: 'Project/TxInfo',
  component: TxInfo
} as ComponentMeta<typeof TxInfo>

const Template: ComponentStory<typeof TxInfo> = args => <TxInfo {...args} />

export const PROCESSING = Template.bind({})
PROCESSING.args = {
  status: ActionType.AddProccesing,
  show: true
}

export const SUCCESS = Template.bind({})
SUCCESS.args = {
  status: ActionType.AddSuccess,
  id: 'eec9911e824f8125f88c1d579136bc91326da5619e4830a53fe6fa34ecd04676',
  show: true,
  isMainnet: false
}

export const TIP = Template.bind({})
TIP.args = {
  ...SUCCESS.args,
  status: ActionType.AddTip
}

export const ERROR = Template.bind({})
ERROR.args = {
  status: ActionType.AddError,
  errorMessage: 'error: pre-condition failed: Should buy at least 1 ballot',
  show: true
}

export const NONE = Template.bind({})
NONE.args = {
  status: ActionType.Reset,
  show: true
}

export const MAINNET = Template.bind({})
MAINNET.args = {
  ...SUCCESS.args,
  isMainnet: true
}
