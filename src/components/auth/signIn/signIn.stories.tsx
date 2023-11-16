import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './signIn.tsx'

const meta = {
  title: 'Auth/LoginForm',
  component: SignIn,
  tags: ['autodocs'],
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: data => console.dir(data),
  },
}
