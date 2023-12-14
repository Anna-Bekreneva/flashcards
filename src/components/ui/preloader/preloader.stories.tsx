import { Meta, StoryObj } from '@storybook/react'

import { Preloader } from '@/components/ui/preloader/preloader.tsx'

const meta = {
  title: 'Components/Preloader',
  component: Preloader,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Preloader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return <Preloader />
  },
}
