import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '.'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    label: { type: 'string' },
    id: { type: 'string' },
    disabled: { type: 'boolean' },
    placeholder: { type: 'boolean' },
    type: {
      options: ['text', 'search', 'password'],
      control: { type: 'radio' },
      defaultValue: 'text',
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  render: args => {
    const [value, setValue] = useState('')
    const changeHandler = (value: string) => {
      setValue(value)
      action(value)()
    }

    return <TextField {...args} value={value} onValueChange={changeHandler} />
  },
}
