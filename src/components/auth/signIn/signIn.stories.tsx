import type { Meta, StoryObj } from '@storybook/react'

import { signIn } from './signIn.tsx'

const meta = {
  title: 'Auth/LoginForm',
  component: signIn,
  tags: ['autodocs'],
} satisfies Meta<typeof signIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
