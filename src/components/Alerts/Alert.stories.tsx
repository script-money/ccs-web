import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Alerts } from '.'
import { AlertType } from '../../reducer/alertReducer'

export default {
  title: 'Project/Alerts',
  component: Alerts,
  argTypes: {
    onDismiss: {
      action: 'Dismiss'
    }
  }
} as ComponentMeta<typeof Alerts>

const Template: ComponentStory<typeof Alerts> = args => <Alerts {...args} />

export const SUCCESS = Template.bind({})
SUCCESS.args = {
  status: AlertType.Success,
  message: 'Activity will show in 1-2 minutes'
}

export const ERROR = Template.bind({})
ERROR.args = {
  status: AlertType.Error,
  message: 'eec9911e824f8125f88c1d579136bc91326da5619e4830a53fe6fa34ecd04676'
}

export const NONE = Template.bind({})
NONE.args = {
  status: AlertType.None
}
