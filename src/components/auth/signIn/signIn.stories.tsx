import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './'

const meta = {
  title: 'Auth/SignIn',
  component: SignIn,
  tags: ['autodocs'],
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const SignInDefault: Story = {}
