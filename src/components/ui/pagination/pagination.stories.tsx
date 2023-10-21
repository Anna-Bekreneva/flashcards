import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    onChangePage: { description: '(currentPage: number) => void' },
    onChangePerPage: { description: '(perPage: number) => void' },
    totalPages: { type: 'number', defaultValue: 50 },
  },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const PaginatorDefault = (args: Story) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [perPage, setPerPage] = useState(5)

  const onChangePage = (currentPage: number) => {
    action(String(currentPage))()
    setCurrentPage(currentPage)
  }

  const onChangePerPage = (perPage: number) => {
    action(String(perPage))()
    setPerPage(perPage)
  }

  return (
    <Pagination
      totalPages={50}
      currentPage={currentPage}
      {...args}
      perPage={perPage}
      onChangePage={onChangePage}
      onChangePerPage={onChangePerPage}
      perPageOptions={[5, 8, 12]}
    />
  )
}
