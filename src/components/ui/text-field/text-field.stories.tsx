import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '.'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['text', 'search', 'password'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Text = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <TextField
        value={value}
        placeholder="placeholder"
        label={'input'}
        errorMsg={'error'}
        onChange={e => setValue(e.currentTarget.value)}
      />
    )
  },
}
export const Password = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <TextField
        type="password"
        value={value}
        placeholder="placeholder"
        label={'password text'}
        errorMsg={'error'}
        onChange={e => setValue(e.currentTarget.value)}
      />
    )
  },
}
export const Search = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <TextField
        type="search"
        value={value}
        placeholder="placeholder"
        label={'password text'}
        errorMsg={'error'}
        onChange={e => setValue(e.currentTarget.value)}
      />
    )
  },
}
export const TextWithError: Story = {
  args: {
    placeholder: 'Placeholder',
    label: 'Error text field',
    errorMsg: 'Some error occurred',
  },
}

export const TextFieldWithoutLabel: Story = {
  args: {
    type: 'text',
    placeholder: 'Text field Without Label',
  },
}

export const DisabledPassword: Story = {
  args: {
    type: 'password',
    placeholder: 'Placeholder',
    label: 'Disabled password text field',
    disabled: true,
  },
}

export const DisabledSearch: Story = {
  args: {
    type: 'search',
    placeholder: 'Placeholder',
    label: 'Disabled search text field',
    disabled: true,
  },
}
