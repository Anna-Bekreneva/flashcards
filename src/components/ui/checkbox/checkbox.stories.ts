import { Meta, StoryObj } from '@storybook/react'

import { CheckboxCustom } from './'

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxCustom,
  tags: ['autodocs'],
  argTypes: {
    disabled: { type: 'boolean' },
  },
} satisfies Meta<typeof CheckboxCustom>

export default meta
type Story = StoryObj<typeof meta>

const onCheckedChange = (value: string) => console.log(value)

export const CheckboxDefault: Story = {
  args: {
    id: 'checkbox-1',
    value: 'checkbox-1',
    label: 'checkbox-1',
    onCheckedChange,
  },
}

export const CheckboxDefaultWithText: Story = {
  args: {
    id: 'checkbox-2',
    value: 'checkbox-2',
    onCheckedChange,
    label: undefined,
  },
}

export const CheckboxDisabled: Story = {
  args: {
    label: 'checkbox-3',
    id: 'checkbox-3',
    value: 'checkbox-2',
    disabled: true,
    onCheckedChange,
  },
}
