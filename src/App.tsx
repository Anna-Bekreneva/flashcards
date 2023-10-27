import { useState } from 'react'

import {
  Column,
  Sort,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table.tsx'

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
    sortable: false,
  },
]

export const data = [
  {
    title: 'Project A',
    cardsCount: 10,
    updated: '2023-07-07',
    createdBy: 'John Doe',
  },
  {
    title: 'Project B',
    cardsCount: 5,
    updated: '2023-07-06',
    createdBy: 'Jane Smith',
  },
  {
    title: 'Project C',
    cardsCount: 8,
    updated: '2023-07-05',
    createdBy: 'Alice Johnson',
  },
  {
    title: 'Project D',
    cardsCount: 3,
    updated: '2023-07-07',
    createdBy: 'Bob Anderson',
  },
  {
    title: 'Project E',
    cardsCount: 12,
    updated: '2023-07-04',
    createdBy: 'Emma Davis',
  },
]

export function App() {
  const [sort, setSort] = useState<Sort>(null)

  console.log(sort)

  return (
    <>
      <Table className={'table'}>
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
    </>
  )
}
