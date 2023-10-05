import { FC, ReactNode, useCallback, useEffect, useState } from 'react'

import s from './pagination.module.scss'

import { OptionType, SelectCustom } from '@/components/ui/select'

type PaginationProps<T> = {
  data: Array<T>
  callback: (pageNumber: number, pageSize: number) => void
  optionsForSelect: OptionType[]
}

export function Pagination<T>(props: PaginationProps<T>) {
  const { data, callback, optionsForSelect } = props
  const dotsValue = <span className={`${s.dots} ${s.item}`}>&#8230;</span>
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsAmountPerPage, setItemsAmountPerPage] = useState(5)
  const totalPageCount = Math.ceil(data.length / itemsAmountPerPage)

  const onPageClick = (pageNumber: number) => {
    callback(pageNumber, itemsAmountPerPage)
    setCurrentPage(pageNumber)
  }
  const calculateMiddlePagePortion = useCallback(() => {
    const middlePortion = [] as ReactNode[]

    for (let i = 2; i < totalPageCount; i++) {
      if (currentPage <= 5 && i <= 5) {
        middlePortion.push(
          <ButtonForPaginator currentPage={currentPage} onClick={onPageClick} pageNumber={i} />
        )
        continue
      }
      if (totalPageCount > 5) {
        middlePortion.push(dotsValue)
      }
      if (middlePortion.length >= 5) return middlePortion

      if (currentPage >= totalPageCount - 4) {
        for (let j = 4; j > 0; j--) {
          middlePortion.push(
            <ButtonForPaginator
              currentPage={currentPage}
              onClick={onPageClick}
              pageNumber={totalPageCount - j}
            />
          )
        }

        return middlePortion
      } else {
        middlePortion.push(
          <ButtonForPaginator
            currentPage={currentPage}
            onClick={onPageClick}
            pageNumber={currentPage - 1}
          />,
          <ButtonForPaginator
            currentPage={currentPage}
            onClick={onPageClick}
            pageNumber={currentPage}
          />,
          <ButtonForPaginator
            currentPage={currentPage}
            onClick={onPageClick}
            pageNumber={currentPage + 1}
          />,
          dotsValue
        )

        return middlePortion
      }
    }

    return middlePortion
  }, [totalPageCount, itemsAmountPerPage, currentPage])

  const calculatePagesArrayForRender = () => {
    let pages

    totalPageCount > 1
      ? (pages = [
          <ButtonForPaginator currentPage={currentPage} onClick={onPageClick} pageNumber={1} />,
          ...calculateMiddlePagePortion(),
          <ButtonForPaginator
            currentPage={currentPage}
            onClick={onPageClick}
            pageNumber={totalPageCount}
          />,
        ])
      : (pages = [
          <ButtonForPaginator currentPage={currentPage} onClick={onPageClick} pageNumber={1} />,
        ])

    return pages
  }

  const [pagesForRendering, setPagesForRendering] = useState(calculatePagesArrayForRender())

  const selectCallBack = (optionValue: string) => {
    setItemsAmountPerPage(+optionValue)
    callback(currentPage, itemsAmountPerPage)
    setPagesForRendering(calculatePagesArrayForRender())
  }

  useEffect(() => {
    setPagesForRendering(calculatePagesArrayForRender())
  }, [itemsAmountPerPage, currentPage])

  const handlePrevClick = () => {
    setCurrentPage(prev => prev - 1)
  }
  const handleNextClick = () => {
    setCurrentPage(prev => prev + 1)
  }

  return (
    <div className={s.paginator}>
      <button
        className={`${currentPage === 1 && s.disabledArrow} ${s.item}`}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>

      {pagesForRendering}

      <button
        className={`${currentPage === totalPageCount && s.disabledArrow} ${s.item}`}
        onClick={handleNextClick}
        disabled={currentPage === totalPageCount}
      >
        {'>'}
      </button>
      <span className={s.selectArea}>
        Show
        <span className={s.select}>
          <SelectCustom items={optionsForSelect} callback={selectCallBack} />
        </span>
        on page
      </span>
    </div>
  )
}

type ButtonForPaginatorPropsType = {
  pageNumber: number
  onClick: (pageNumber: number) => void
  currentPage: number
}
const ButtonForPaginator: FC<ButtonForPaginatorPropsType> = ({
  pageNumber,
  onClick,
  currentPage,
}) => {
  return (
    <button
      onClick={() => onClick(pageNumber)}
      className={`${pageNumber === currentPage ? s.currentPage : ''} ${s.btn} ${s.item}`}
      key={pageNumber}
    >
      {pageNumber}
    </button>
  )
}
