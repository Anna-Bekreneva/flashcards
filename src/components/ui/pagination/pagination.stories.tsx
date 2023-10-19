import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    onChangePage: { description: '(page: number) => void' },
    onChangePerPage: { description: '(perPage: number) => void' },
    totalPages: { type: 'number', defaultValue: 50 },
  },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export function PaginatorDefault(args: Story) {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState(5)

  const onChangePage = (page: number) => {
    action(String(page))()
    setPage(page)
  }

  const onChangePerPage = (perPage: number) => {
    action(String(perPage))()
    setPerPage(perPage)
  }

  return (
    <Pagination
      totalPages={50}
      page={page}
      {...args}
      perPage={perPage}
      onChangePage={onChangePage}
      onChangePerPage={onChangePerPage}
      perPageOptions={[5, 8, 12]}
    />
  )
}
