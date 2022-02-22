import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MaintenanceBanner } from '.'

export default {
  title: 'Project/MaintenanceBanner',
  component: MaintenanceBanner,
  argTypes: {
    onClose: {
      action: 'closeBanner'
    }
  }
} as ComponentMeta<typeof MaintenanceBanner>

const Template: ComponentStory<typeof MaintenanceBanner> = () => (
  <MaintenanceBanner />
)

export const DEFAULT = Template.bind({})
