import { FC, forwardRef } from 'react'

import s from './pagination.module.scss'

import { TypographyVariant } from '@/common/types/types.ts'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

type Props = {
  onChangePage: (page: number) => void
  onChangePerPage: (perPage: number) => void
  perPageOptions: number[]
  totalPages: number
  perPage: number
  page: number
}

type MiddlePaginationType = number | '...'
export const Pagination = forwardRef<HTMLDivElement, Props>(
  ({ onChangePage, onChangePerPage, perPageOptions, totalPages, perPage, page }, ref?) => {
    const onPageClick = (page: number) => onChangePage(page)

    const paginationRange = (page: number, totalPages: number): MiddlePaginationType[] => {
      let middle: MiddlePaginationType[] = []

      if (totalPages <= 5) {
        for (let i = 1; i < totalPages + 1; i++) {
          middle.push(i)
        }
      } else {
        if (page <= 4) {
          for (let i = 2; i < 5 + 1; i++) {
            middle.push(i)
          }
          middle.push('...')
        } else if (page >= totalPages - 3) {
          middle.push('...')
          for (let i = totalPages - 4; i < totalPages; i++) {
            middle.push(i)
          }
        } else {
          middle = ['...', page - 1, page, page + 1, '...']
        }
      }

      return [1, ...middle, totalPages]
    }

    const arrayPaginationRange: MiddlePaginationType[] = paginationRange(page, totalPages)

    const selectCallBack = (value: string) => onChangePerPage(Number(value))
    const handlePrevClick = () => onChangePage(page - 1)

    const handleNextClick = () => onChangePage(page + 1)

    const optionsForSelect = perPageOptions.map(el => ({ value: String(el), label: String(el) }))

    return (
      <div className={s.paginator} ref={ref}>
        <ArrowButton onClick={handlePrevClick} disabled={page === 1} type={'prev'} />

        <MainButtons
          page={page}
          arrayPaginationRange={arrayPaginationRange}
          onChangePage={onPageClick}
        />

        <ArrowButton onClick={handleNextClick} disabled={page === totalPages} type={'next'} />
        <div className={s.selectArea}>
          <Select
            value={String(perPage)}
            className={s.select}
            id={'selectPagination'}
            label={'Show'}
            items={optionsForSelect}
            onValueChange={selectCallBack}
          />
          <span className={s.selectSubtext}>on page</span>
        </div>
      </div>
    )
  }
)

type ArrowButtonProps = {
  type: 'prev' | 'next'
  className?: string
  disabled: boolean
  onClick: () => void
}

const ArrowButton: FC<ArrowButtonProps> = ({ type, className, disabled, onClick }) => {
  const buttonClassName = `${s.buttonArrow} ${className ? className : ''} ${s[type]}`

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      aria-label={type}
      type={'button'}
    />
  )
}

type MainButtonsProps = {
  onChangePage: (page: number) => void
  arrayPaginationRange: MiddlePaginationType[]
  page: number
}

const MainButtons: FC<MainButtonsProps> = ({ arrayPaginationRange, onChangePage, page }) => {
  const items = arrayPaginationRange.map((el, index) => {
    if (el !== '...') {
      const buttonClassName = `${s.item} ${s.button} ${el === page ? s.active : ''}`

      return (
        <MainButton
          className={buttonClassName}
          key={index}
          pageNumber={el}
          onClick={onChangePage}
        />
      )
    } else {
      return (
        <Typography className={s.item} key={index} as={'span'} variant={TypographyVariant.body2}>
          {el}
        </Typography>
      )
    }
  })

  return <>{items}</>
}

type MainButtonProps = {
  onClick: (pageNumber: number) => void
  pageNumber: number
  className?: string
}
const MainButton: FC<MainButtonProps> = ({ onClick, pageNumber, className }) => {
  return (
    <Typography
      className={className}
      onClick={() => onClick(pageNumber)}
      as={'button'}
      type={'button'}
      variant={TypographyVariant.body2}
    >
      {pageNumber}
    </Typography>
  )
}
