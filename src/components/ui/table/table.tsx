import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components'
import s from '@/components/ui/table/table.module.scss'

export type Column = {
  key: string
  title: string
  sortable?: boolean
}

export type Sort = {
  key: string
  direction: SortDirectionType
} | null

export type SortDirectionType = 'asc' | 'desc'

export const Table = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref?) => {
    return (
      <table className={`${s.table} ${className ? className : ''}`} ref={ref} {...rest}></table>
    )
  }
)

type TableHeadProps = Omit<ComponentPropsWithoutRef<'thead'>, 'columns'> & {
  columns: Column[]
  sort?: Sort
  onSort?: (sort: Sort) => void
}

export const TableHeader = forwardRef<ElementRef<'thead'>, TableHeadProps>(
  ({ className, columns, sort, onSort, ...rest }, ref?) => {
    const handleSort = (key: string, sortable?: boolean) => () => {
      if (!onSort || !sortable) return

      if (sort?.key !== key) return onSort({ key, direction: 'asc' })
      if (sort.direction === 'desc') return onSort(null)

      return onSort({
        key,
        direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      })
    }

    const arrowClassName = `${s.arrow} ${sort?.direction === 'asc' ? s.arrowTop : s.arrowBottom}`

    return (
      <TableHead className={`${className} ${s.thead}`} ref={ref} {...rest}>
        <TableRow>
          {columns.map(({ title, key, sortable }) => (
            <TableHeadRow
              key={key}
              onClick={handleSort(key, sortable)}
              className={`${s.headCell} ${s.cell}`}
            >
              <Typography className={sort && sort.key === key ? arrowClassName : ''} as={'span'}>
                {title}
              </Typography>
            </TableHeadRow>
          ))}
        </TableRow>
      </TableHead>
    )
  }
)

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ ...rest }, ref?) => {
    return <thead {...rest} ref={ref} />
  }
)

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...rest }, ref?) => {
    return <tbody className={`${s.tbody} ${className}`} {...rest} ref={ref} />
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
    return <td className={`${s.cell} ${className ? className : ''}`} {...rest} ref={ref} />
  }
)
