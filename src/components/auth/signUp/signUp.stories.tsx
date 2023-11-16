import { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './'

const meta = {
  title: 'Auth/LoginForm',
  component: SignUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const SignUpDefault: Story = {
  args: {
    onSubmit: data => console.dir(data),
  },
}
