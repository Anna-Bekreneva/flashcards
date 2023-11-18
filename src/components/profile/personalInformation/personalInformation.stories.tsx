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
      console.dir('on avatar change')
    },
    onLogout: () => {
      console.dir('on logout')
    },
    onNameChange: () => {
      console.dir('on name change')
    },
  },
}
