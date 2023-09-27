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

export const Dark: Story = () => {
  return (
    <Card as={'article'} style={{ padding: '20px' }}>
      <Typography as={'p'} label={'This is a dark card'} style={{ color: 'white' }}></Typography>
      <Button>Test</Button>
    </Card>
  )
}

export const Light: Story = () => {
  return (
    <Card variant={'light'} style={{ padding: '20px' }}>
      <Typography as={'h3'} label={'This is a light card'}></Typography>
    </Card>
  )
}
