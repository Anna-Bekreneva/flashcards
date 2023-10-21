import { useState } from 'react'

import { Pagination } from '@/components/ui/pagination'

export function App() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [perPage, setPerPage] = useState(5)

  const onChangePage = (currentPage: number) => {
    console.log(currentPage)
    setCurrentPage(currentPage)
  }

  const onChangePerPage = (perPage: number) => {
    console.log(perPage)
    setPerPage(perPage)
  }

  return (
    <Pagination
      onChangePage={onChangePage}
      onChangePerPage={onChangePerPage}
      perPageOptions={[5, 8, 12]}
      totalPages={50}
      perPage={perPage}
      currentPage={currentPage}
    />
  )
}
