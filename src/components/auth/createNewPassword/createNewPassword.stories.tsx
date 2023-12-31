import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from './'

const meta = {
  title: 'Auth/CreateNewPassword',
  component: CreateNewPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordDefault: Story = {
  args: {
    onSubmit: data => console.dir(data),
  },
}
