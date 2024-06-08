import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from './'

import userPhoto from '@/assets/images/user.png'

const meta = {
  component: EditProfile,
  tags: ['autodocs'],
  title: 'Profile/EditProfile',
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const EditProfileDefault: Story = {
  args: {
    avatar: userPhoto,
    prevName: 'Ivan',

    onSubmit: data => {
      action(data.name)()
    },
  },
}
