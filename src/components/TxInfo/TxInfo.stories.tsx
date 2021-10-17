import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TxInfo } from '.'

export default {
  title: 'Project/TxInfo',
  component: TxInfo
} as ComponentMeta<typeof TxInfo>

const Template: ComponentStory<typeof TxInfo> = args => <TxInfo {...args} />

export const PROCESSING = Template.bind({})
PROCESSING.args = {
  status: 'PROCESSING'
}

export const SUCCESS = Template.bind({})
SUCCESS.args = {
  status: 'SUCCESS',
  id: 'eec9911e824f8125f88c1d579136bc91326da5619e4830a53fe6fa34ecd04676'
}

export const ERROR = Template.bind({})
ERROR.args = {
  status: 'ERROR',
  id: 'eec9911e824f8125f88c1d579136bc91326da5619e4830a53fe6fa34ecd04676'
}
