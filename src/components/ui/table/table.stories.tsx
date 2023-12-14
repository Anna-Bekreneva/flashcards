import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { Column, Sort, Table, TableBody, TableCell, TableHeader, TableRow } from './'

const columns: Array<Column> = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'createdBy',
    title: 'Created by',
    sortable: false,
  },
]

const data = [
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

const meta = {
  title: 'Components/TableWithSort',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const TableDefault = (args: Story) => {
  const [sort, setSort] = useState<Sort>(null)

  action(`${sort?.direction} ${sort?.key}`)()

  return (
    <Table className={'table'} {...args}>
      <TableHeader sort={sort} onSort={setSort} columns={columns} />
      <TableBody>
        <TableRow>
          <TableCell>Project A</TableCell>
          <TableCell>10</TableCell>
          <TableCell>2023-07-07</TableCell>
          <TableCell>John Doe</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Project B</TableCell>
          <TableCell>5</TableCell>
          <TableCell>2023-07-06</TableCell>
          <TableCell>Jane Smith</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Project C</TableCell>
          <TableCell>8</TableCell>
          <TableCell>2023-07-05</TableCell>
          <TableCell>Alice Johnson</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export const TableWithMap = (args: Story) => {
  const [sort, setSort] = useState<Sort>(null)

  action(`${sort?.direction} ${sort?.key}`)()

  return (
    <Table className={'table'} {...args}>
      <TableHeader sort={sort} onSort={setSort} columns={columns}></TableHeader>
      <TableBody>
        {data.map((item, key) => (
          <TableRow key={key}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.cardsCount}</TableCell>
            <TableCell>{item.updated}</TableCell>
            <TableCell>{item.createdBy}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
