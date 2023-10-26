import { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/components'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    userName: { type: 'string' },
    userEmail: { type: 'string' },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithDropDownMenu: Story = {
  render: args => {
    return <Header {...args}></Header>
  },
}
