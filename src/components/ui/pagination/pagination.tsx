import { FC, forwardRef } from 'react'

import s from './pagination.module.scss'

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
        } else if (page >= totalPages - 4) {
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

    const selectCallBack = (optionValue: string) => {
      onChangePerPage(+optionValue)
      // callback(page, perPage)
      //setPagesForRendering(calculatePagesArrayForRender())
    }

    const handlePrevClick = () => onChangePage(page - 1)

    const handleNextClick = () => onChangePage(page + 1)

    return (
      <div className={s.paginator} ref={ref}>
        <ArrowButton onClick={handlePrevClick} disabled={page === 1} type={'prev'} />

        <MainButtons arrayPaginationRange={arrayPaginationRange} onChangePage={onPageClick} />

        <ArrowButton onClick={handleNextClick} disabled={page === totalPages} type={'next'} />
        <span className={s.selectArea}>
          Show
          {/*<span className={s.select}>*/}
          {/*  <SelectCustom items={perPageOptions} callback={selectCallBack} />*/}
          {/*</span>*/}
          on page
        </span>
      </div>
    )
  }
)

type ArrowButtonProps = {
  type: 'prev' | 'next'
  className?: string
  disabled: boolean
  onClick: (some: any) => void
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
}

const MainButtons: FC<MainButtonsProps> = ({ arrayPaginationRange, onChangePage }) => {
  const items = arrayPaginationRange.map((el, index) => {
    if (el !== '...') {
      return <MainButton key={index} pageNumber={el} onClick={onChangePage} />
    } else {
      return <span key={index}>{el}</span>
    }
  })

  return <>{items}</>
}

type MainButtonProps = {
  onClick: (pageNumber: number) => void
  pageNumber: number
}
const MainButton: FC<MainButtonProps> = ({ onClick, pageNumber }) => {
  return (
    <button onClick={() => onClick(pageNumber)} className={s.item} key={pageNumber}>
      {pageNumber}
    </button>
  )
}
