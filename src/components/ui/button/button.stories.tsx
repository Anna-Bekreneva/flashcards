import { Meta, StoryObj } from '@storybook/react'

import { Button } from './'

import { Logout } from '@/assets/iconsComponents'
import { ButtonVariant } from '@/common/types/types.ts'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ButtonVariant,
      control: { type: 'radio' },
    },
    fullWidth: { type: 'boolean' },
    disabled: { type: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: ButtonVariant.primary,
    children: 'Button primary ',
  },
}
export const Secondary: Story = {
  args: {
    variant: ButtonVariant.secondary,
    children: 'Button secondary ',
  },
}
export const Tertiary: Story = {
  args: {
    variant: ButtonVariant.tertiary,
    children: 'Tertiary',
  },
}
export const Link: Story = {
  args: {
    as: 'a',
    href: 'https://www.yahoo.com/',
    variant: ButtonVariant.link,
    children: 'Link Button',
  },
}

export const FullWidth: Story = {
  args: {
    variant: ButtonVariant.primary,
    children: 'Full Width Button',
    fullWidth: true,
  },
}
export const PrimaryWithIcon: Story = {
  args: {
    variant: ButtonVariant.primary,
    children: (
      <>
        <Logout />
        Primary Button
      </>
    ),
  },
}

export const SecondaryWithIcon: Story = {
  args: {
    variant: ButtonVariant.secondary,
    children: (
      <>
        <Logout />
        Secondary Button
      </>
    ),
  },
}
