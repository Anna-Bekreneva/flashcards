import type { Meta, StoryObj } from '@storybook/react'

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
    variant: 'dark',
    children: (
      <div>
        <p>Test dark card with jsx children</p>
        <input />
        <div>
          <Button>Test</Button>
        </div>
      </div>
    ),
  },
}

export const Light: Story = {
  args: {
    variant: 'light',
    children: 'Test card with light theme and text children',
  },
}
