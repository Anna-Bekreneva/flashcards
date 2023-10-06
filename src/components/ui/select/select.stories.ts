import { Meta, StoryObj } from '@storybook/react'

import { SelectCustom } from './'

const items = [
  { label: 'label1', value: 'value1' },
  { label: 'label2', value: 'value2' },
  { label: 'label3', value: 'value3' },
]

const callback = (value: string) => {
  console.log(value)
}

const meta = {
  title: 'Components/Select',
  component: SelectCustom,
  tags: ['autodocs'],
  argTypes: {
    items,
    callback,
  },
} satisfies Meta<typeof SelectCustom>

export default meta
type Story = StoryObj<typeof meta>

export const SelectDefault: Story = {
  args: {
    items,
    callback,
  },
}

export const SelectDisabled: Story = {
  args: {
    items,
    callback,
    disabled: true,
  },
}
