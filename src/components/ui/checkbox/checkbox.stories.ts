import { Meta, StoryObj } from '@storybook/react'

import { CheckboxCustom } from './'

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxCustom,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text', defaultValue: 'id-1' },
    label: { control: 'text', defaultValue: 'checkbox' },
    checked: { type: 'boolean' },
  },
} satisfies Meta<typeof CheckboxCustom>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxDefault: Story = {
  args: {
    id: 'checkbox-1',
    disabled: false,
  },
}

export const CheckboxDefaultWithText: Story = {
  args: {
    label: 'checkbox-2',
    id: 'checkbox-2',
    disabled: false,
  },
}
