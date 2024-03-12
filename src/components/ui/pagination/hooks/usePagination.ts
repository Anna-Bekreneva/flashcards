export type MiddlePaginationType = number | '...'
export const usePagination = (
  onChangePage: (currentPage: number) => void,
  onChangePerPage: (perPage: number) => void,
  currentPage: number,
  perPageOptions: number[]
) => {
  const onPageClick = (currentPage: number) => onChangePage(currentPage)

  const paginationRange = (currentPage: number, totalPages: number): MiddlePaginationType[] => {
    let middle: MiddlePaginationType[] = []

    if (totalPages <= 5) {
      for (let i = 1; i < totalPages + 1; i++) {
        middle.push(i)
      }

      return middle
    } else {
      if (currentPage <= 4) {
        for (let i = 2; i < 5 + 1; i++) {
          middle.push(i)
        }
        middle.push('...')
      } else if (currentPage >= totalPages - 3) {
        middle.push('...')
        for (let i = totalPages - 4; i < totalPages; i++) {
          middle.push(i)
        }
      } else {
        middle = ['...', currentPage - 1, currentPage, currentPage + 1, '...']
      }

      return [1, ...middle, totalPages]
    }
  }

  const selectCallBack = (value: string) => onChangePerPage(Number(value))
  const handlePrevClick = () => onChangePage(currentPage - 1)

  const handleNextClick = () => onChangePage(currentPage + 1)

  const optionsForSelect = perPageOptions.map(el => ({ value: String(el), label: String(el) }))

  return {
    selectCallBack,
    handlePrevClick,
    handleNextClick,
    optionsForSelect,
    paginationRange,
    onPageClick,
  }
}
