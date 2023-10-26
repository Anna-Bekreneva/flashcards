import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef } from 'react'

import s from '@/components/ui/table/table.module.scss'

export type Column = {
  key: string
  title: string
  sortable?: boolean
}

export type Sort = {
  key: string
  direction: sortDirectionType
} | null

export type sortDirectionType = 'asc' | 'desc'

export const Table = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref?) => {
    return (
      <table className={`${s.table} ${className ? className : ''}`} ref={ref} {...rest}></table>
    )
  }
)
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
          <TableHeadRow key={key} onClick={handleSort(key, sortable)} className={s.headCell}>
            {title}
            {sort && sort.key === key && <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>}
          </TableHeadRow>
        ))}
      </TableRow>
    </thead>
  )
}

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ ...rest }, ref?) => {
    return <tbody {...rest} ref={ref} />
  }
)
export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...rest }, ref?) => {
    return <tr className={`${s.row} ${className ? className : ''}`} {...rest} ref={ref} />
  }
)
export const TableHeadRow = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...rest }, ref?) => {
    return <th className={`${s.headRow} ${className ? className : ''}`} {...rest} ref={ref} />
  }
)
export const TableCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...rest }, ref?) => {
    return <td className={`${s.tableCell} ${className ? className : ''}`} {...rest} ref={ref} />
  }
)
