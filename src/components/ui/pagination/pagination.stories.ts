import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '@/components/ui/pagination/pagination.tsx'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationDefault: Story = {
  args: {},
}
