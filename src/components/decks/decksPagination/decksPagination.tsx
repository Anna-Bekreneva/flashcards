import { FC } from 'react'

import s from './decksPagination.module.scss'

import { Pagination } from '@/components'

type Props = {
  totalPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
  setItemsPerPage: (sepPage: number) => void
  perPage: number
}
export const DecksPagination: FC<Props> = ({
  totalPages,
  currentPage,
  setCurrentPage,
  setItemsPerPage,
  perPage,
}) => {
  const perPageOptions = [10, 20, 30, 50]

  return (
    <Pagination
      className={s.pagination}
      totalPages={totalPages}
      currentPage={currentPage}
      onChangePage={page => setCurrentPage(page)}
      onChangePerPage={perPage => {
        setItemsPerPage(perPage)
      }}
      perPageOptions={perPageOptions}
      perPage={perPage}
    />
  )
}
