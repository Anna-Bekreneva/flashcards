import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import userPhoto from '@/assets/images/user.png'
import { PersonalInformation } from '@/components/profile/personalInformation/personalInformation.tsx'

const meta = {
  component: PersonalInformation,
  tags: ['autodocs'],
  title: 'Profile/Personal information',
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalInformationDefault: Story = {
  args: {
    avatar: userPhoto,
    email: 'j&johnson@gmail.com',
    name: 'Ivan',
    onAvatarChange: () => {
      action('on avatar change')()
    },
    onLogout: () => {
      action('on logout')()
    },
    onNameChange: () => {
      action('on name change')()
    },
  },
}
