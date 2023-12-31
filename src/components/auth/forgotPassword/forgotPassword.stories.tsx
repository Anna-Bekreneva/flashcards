import { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from './'

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordDefault: Story = {
  args: {
    onSubmit: data => console.dir(data),
  },
}
