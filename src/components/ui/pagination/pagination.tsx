import { FC, forwardRef } from 'react'

import s from './pagination.module.scss'

import { TypographyVariant } from '@/common'
import { MiddlePaginationType, Select, Typography, usePagination } from '@/components'

type Props = {
  className?: string
  onChangePage: (currentPage: number) => void
  onChangePerPage: (perPage: number) => void
  perPageOptions: number[]
  totalPages: number
  perPage: number
  currentPage: number
}

export const Pagination = forwardRef<HTMLDivElement, Props>(
  (
    { onChangePage, onChangePerPage, perPageOptions, totalPages, perPage, currentPage, className },
    ref?
  ) => {
    const {
      selectCallBack,
      handlePrevClick,
      handleNextClick,
      optionsForSelect,
      paginationRange,
      onPageClick,
    } = usePagination(onChangePage, onChangePerPage, currentPage, perPageOptions)

    return (
      <div className={`${s.paginator} ${className}`} ref={ref}>
        <ArrowButton onClick={handlePrevClick} disabled={currentPage === 1} type={'prev'} />

        <MainButtons
          page={currentPage}
          arrayPaginationRange={paginationRange(currentPage, totalPages)}
          onChangePage={onPageClick}
        />

        <ArrowButton
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          type={'next'}
        />
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
  onChangePage: (pageNumber: number) => void
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
