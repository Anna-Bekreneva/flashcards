import { Meta, StoryObj } from '@storybook/react'

import { ProgressBar } from '@/components/ui/progressBar/progressBar.tsx'

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return <ProgressBar />
  },
}
