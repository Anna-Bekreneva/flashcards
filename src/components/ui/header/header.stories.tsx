import { Meta, StoryObj } from '@storybook/react'

import Header from '@/components/ui/header/header.tsx'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithDropDownMenu: Story = {
  args: {
    isLoggedIn: true,
    userName: 'UserName',
  },
}

export const HeaderWithButton: Story = {
  args: {
    isLoggedIn: false,
  },
}
