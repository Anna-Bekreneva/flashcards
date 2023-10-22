import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { Column, TableWithSort } from '@/components/ui/table/table.tsx'

const columns: Array<Column> = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'cardsCount',
    title: 'Cards',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'createdBy',
    title: 'Created by',
    sortable: true,
  },
  {
    key: 'icons',
    title: '',
    sortable: false,
  },
]

export const data = [
  {
    title: 'Project A',
    cardsCount: 10,
    updated: '2023-07-07',
    createdBy: 'John Doe',
    icons: 'icons...',
  },
  {
    title: 'Project B',
    cardsCount: 5,
    updated: '2023-07-06',
    createdBy: 'Jane Smith',
    icons: 'icons...',
  },
  {
    title: 'Project C',
    cardsCount: 8,
    updated: '2023-07-05',
    createdBy: 'Alice Johnson',
    icons: 'icons...',
  },
  {
    title: 'Project D',
    cardsCount: 3,
    updated: '2023-07-07',
    createdBy: 'Bob Anderson',
    icons: 'icons...',
  },
  {
    title: 'Project E',
    cardsCount: 12,
    updated: '2023-07-04',
    createdBy: 'Emma Davis',
    icons: 'icons...',
  },
]

const onChangeSort = (sortedString: string) => {
  action(sortedString)()
}

const meta = {
  title: 'Components/TableWithSort',
  component: TableWithSort,
  tags: ['autodocs'],
  argTypes: {
    columns,
    data,
    onChangeSort,
  },
} satisfies Meta<typeof TableWithSort>

export default meta
type Story = StoryObj<typeof meta>

export const TableWithSortDefault: Story = {
  args: {
    columns,
    data,
    onChangeSort,
  },
}
