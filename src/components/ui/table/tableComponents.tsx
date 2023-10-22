import { ComponentProps, ComponentPropsWithoutRef, FC } from 'react'

import s from './table.module.scss'

import { Column, Sort } from '@/components/ui/table/table.tsx'

type TableProps = ComponentProps<'table'>
export const Table: FC<TableProps> = ({ className, ...rest }) => {
  return <table className={`${className} ${s.table}`} {...rest} />
}

export const TableHead: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
      sort?: Sort
      onSort?: (sort: Sort) => void
    },
    'children'
  >
> = ({ className, columns, sort, onSort, ...restProps }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) return

    if (sort?.key !== key) return onSort({ key, direction: 'asc' })
    if (sort.direction === 'desc') return onSort(null)

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <thead {...restProps} className={`${className} ${s.thead}`}>
      <TableRow>
        {columns.map(({ title, key, sortable }) => (
          <TableCell key={key} onClick={handleSort(key, sortable)} className={s.headCell}>
            {title}
            {sort && sort.key === key && <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>}
          </TableCell>
        ))}
      </TableRow>
    </thead>
  )
}

type TableBodyProps = ComponentProps<'tbody'>
export const TableBody: FC<TableBodyProps> = props => {
  return <tbody {...props} />
}

type TableRowProps = ComponentProps<'tr'>
export const TableRow: FC<TableRowProps> = props => {
  return <tr {...props} className={s.row} />
}

type TableCellProps = ComponentProps<'td'>
export const TableCell: FC<TableCellProps> = ({ className, ...rest }) => {
  return <td className={`${className} ${s.tableCell}`} {...rest} />
}
