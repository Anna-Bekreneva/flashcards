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
    return (
      <TextField value={'value'} placeholder="placeholder" label={'input'} errorMsg={'error'} />
    )
  },
}
export const Password = {
  render: () => {
    return (
      <TextField
        type="password"
        value={'value'}
        placeholder="placeholder"
        label={'password text'}
        errorMsg={'error'}
      />
    )
  },
}
export const Search = {
  render: () => {
    return (
      <TextField
        type="search"
        value=""
        placeholder="placeholder"
        label={'password text'}
        errorMsg={'error'}
        leftSideIcon={<search />}
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
