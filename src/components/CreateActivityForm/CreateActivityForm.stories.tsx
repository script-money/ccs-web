import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CreateActivityForm } from '.'

export default {
  title: 'Project/CreateActivityForm',
  component: CreateActivityForm,
  argTypes: {
    onSubmit: {
      action: 'createActivity'
    }
  }
} as ComponentMeta<typeof CreateActivityForm>

const Template: ComponentStory<typeof CreateActivityForm> = args => (
  <CreateActivityForm {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  sendAmount: 100.0,
  hasAmount: 10.23343
}
