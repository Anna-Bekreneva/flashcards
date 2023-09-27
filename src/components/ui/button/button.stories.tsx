import type { Meta, StoryObj } from '@storybook/react'

import { Logout } from '../../../assets/iconsComponents'

import { Button } from './'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button primary ',
    disabled: false,
  },
}
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button secondary ',
    disabled: false,
  },
}
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary',
    disabled: false,
  },
}
export const Link: Story = {
  args: {
    as: 'a',
    href: 'https://www.yahoo.com/',
    variant: 'link',
    children: 'Link Button',
    disabled: false,
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
  },
}
export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Logout />
        Primary Button
      </>
    ),
    disabled: false,
  },
}

export const SecondaryWithIcon: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <Logout />
        Secondary Button
      </>
    ),
    disabled: false,
  },
}
