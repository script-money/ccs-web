import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TxDetail } from '.'

export default {
  title: 'Project/TxDetail',
  component: TxDetail,
  argTypes: {
    onConfirm: {
      action: 'Confirm'
    }
  }
} as ComponentMeta<typeof TxDetail>

const Template: ComponentStory<typeof TxDetail> = args => <TxDetail {...args} />

export const PROCESSING = Template.bind({})
PROCESSING.args = {
  status: 'PROCESSING'
}

export const SUCCESS = Template.bind({})
SUCCESS.args = {
  status: 'SUCCESS',
  id: 'eec9911e824f8125f88c1d579136bc91326da5619e4830a53fe6fa34ecd04676',
  notification: 'Activity will show in 1-2 minutes',
  isMainnet: false
}

export const ERROR = Template.bind({})
ERROR.args = {
  status: 'ERROR',
  id: 'eec9911e824f8125f88c1d579136bc91326da5619e4830a53fe6fa34ecd04676',
  isMainnet: false
}

export const MAINNET = Template.bind({})
MAINNET.args = {
  ...SUCCESS.args,
  isMainnet: true
}
