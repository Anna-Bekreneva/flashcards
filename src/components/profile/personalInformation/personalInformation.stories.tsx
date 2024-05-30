import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import userPhoto from '@/assets/images/user.png'
import { PersonalInformation } from '@/components'
import { store } from '@/services'

const meta = {
  component: PersonalInformation,
  tags: ['autodocs'],
  title: 'Profile/Personal information',
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalInformationDefault: Story = {
  args: {
    avatar: userPhoto,
    email: 'j&johnson@gmail.com',
    userName: 'Ivan',
    onUserDataChange: () => {
      action('on avatar change')()
    },
  },
}
