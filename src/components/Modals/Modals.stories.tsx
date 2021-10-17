import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Modals } from '.'

export default {
  title: 'Project/Modals',
  component: Modals,
  argTypes: {
    onSubmit: {
      action: 'sendTransaction'
    }
  }
} as ComponentMeta<typeof Modals>

const Template: ComponentStory<typeof Modals> = args => <Modals {...args} />

export const SetupAccount = Template.bind({})
