import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { type: 'string' },
    id: { type: 'string' },
    name: { type: 'string' },
    disabled: { type: 'boolean' },
    onValueChange: { description: '(value: string) => void' },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectDefault = (args: Story) => {
  const items = [
    { label: 'label1', value: 'value1' },
    { label: 'label2', value: 'value2' },
    { label: 'label3', value: 'value3' },
  ]

  const [value, setValue] = useState('value1')
  const onChange = (value: string) => {
    action(value)()
    setValue(value)
  }

  return <Select {...args} items={items} value={value} onValueChange={onChange} />
}
