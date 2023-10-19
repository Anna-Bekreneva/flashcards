import { useState } from 'react'

import { Pagination } from '@/components/ui/pagination'

export function App() {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState(5)

  const onChangePage = (page: number) => {
    console.log(page)
    setPage(page)
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
      page={page}
    />
  )
}
