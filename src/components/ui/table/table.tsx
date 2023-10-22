import { FC, useEffect, useMemo, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table/tableComponents.tsx'

export type Column = {
  key: string
  title: string
  sortable?: boolean
}

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

type Props = {
  onChangeSort?: (sortedString: string) => void
  columns?: Array<Column>
  data?: Array<Object> //to fix?
}
export const TableWithSort: FC<Props> = ({ onChangeSort, data, columns }) => {
  const [sort, setSort] = useState<Sort>(null)

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  useEffect(() => {
    if (sortedString && onChangeSort) onChangeSort(sortedString)
  }, [sort])

  return (
    <Table>
      {columns && <TableHead columns={columns} sort={sort} onSort={setSort} />}
      <TableBody>
        {data &&
          data.map((item, index) => (
            <TableRow key={index}>
              {Object.keys(item).map((itemKey, ind) => (
                // @ts-ignore
                <TableCell key={ind}>{item[itemKey]}</TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
