import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '../typography'

import { Card } from './'

import { Button } from '@/components/ui/button'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['dark', 'light'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Dark: Story = {
  args: {
    as: 'article',
    style: { padding: '20px' },
    children: (
      <>
        <Typography as={'p'}>This is a dark card</Typography>
        <Button>Test</Button>
      </>
    ),
  },
}

export const Light: Story = {
  args: {
    variant: 'light',
    style: { padding: '20px' },
    children: <Typography as={'h3'}>This is a light card</Typography>,
  },
}
