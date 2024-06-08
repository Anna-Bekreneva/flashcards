import { useState } from 'react'

import { useDebounce } from 'use-debounce'

import { DecksTabsVariant, DecksTabsVariantType } from '@/common'
import { Sort, ValuesSliderType } from '@/components'
import {
  decksSlice,
  useAppDispatch,
  useAppSelector,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
  selectDecksCurrentPage,
  selectItemsPerPage,
  selectMaxCardCount,
  selectMinCardCount,
  selectName,
  useMeQuery,
  selectSort,
  selectTabsDecksValue,
} from '@/services'

export const useDecksPage = () => {
  const dispatch = useAppDispatch()

  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [addDeck] = useCreateDeckMutation()
  const { data: meData } = useMeQuery()

  const currentPage = useAppSelector(selectDecksCurrentPage)
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const minCardsCount = useAppSelector(selectMinCardCount)
  const maxCardsCount = useAppSelector(selectMaxCardCount)
  const sort = useAppSelector(selectSort)
  const search = useAppSelector(selectName)
  const tabsValue = useAppSelector(selectTabsDecksValue)

  const myId = meData?.id

  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))
  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))
  const setMinCardsCount = (minCardsCount: number) =>
    dispatch(decksSlice.actions.setMinCardsCount(minCardsCount))
  const setMaxCardsCount = (maxCardsCount: number) =>
    dispatch(decksSlice.actions.setMaxCardsCount(maxCardsCount))
  const setSearch = (name: string) => dispatch(decksSlice.actions.setName(name))
  const setSort = (value: Sort) => dispatch(decksSlice.actions.setSort(value))
  const setTabsValue = (value: DecksTabsVariantType) =>
    dispatch(decksSlice.actions.setTabDecksValue(value))

  const [searchWithDebounce] = useDebounce(search, 1000)
  const [maxCardsWithDebounce] = useDebounce(maxCardsCount, 1000)
  const [minCardsWithDebounce] = useDebounce(minCardsCount, 1000)
  // tabs
  const authorId = tabsValue === 'my' ? myId : ''

  const { currentData, isLoading, isFetching } = useGetDecksQuery({
    minCardsCount: minCardsWithDebounce,
    maxCardsCount: maxCardsWithDebounce,
    name: searchWithDebounce,
    currentPage,
    itemsPerPage,
    authorId,
    orderBy: sort ? `${sort?.key}-${sort?.direction}` : null,
  })

  // update modal
  const [idUpdateDeck, setIdUpdateDeck] = useState('')
  const deckForUpdate = currentData?.items.find(item => item.id === idUpdateDeck)

  const currentDeck = {
    name: deckForUpdate?.name,
    isPrivate: deckForUpdate?.isPrivate,
    cover: deckForUpdate?.cover ?? '',
  }

  // delete modal
  const [idDeleteDeck, setIdDeleteDeck] = useState('')
  const nameDeleteDeck = currentData?.items.find(item => item.id === idDeleteDeck)?.name

  // add modal
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const clearSettingsHandler = () => {
    setSearch('')
    setTabsValue(DecksTabsVariant.allCards)
    setMinCardsCount(0)
    currentData?.maxCardsCount && setMaxCardsCount(currentData?.maxCardsCount)
  }

  // slider
  const changeValueSliderHandler = (values: number[]) => {
    setMaxCardsCount(values[1])
    setMinCardsCount(values[0])
  }

  const commitValueSliderHandler = (values: number[]) => {
    changeValueSliderHandler(values)
    setMinCardsCount(values[0])
    setMaxCardsCount(values[1])
  }

  const valuesSlider: ValuesSliderType = [
    minCardsCount,
    maxCardsCount || currentData?.maxCardsCount || 0,
  ]

  return {
    isLoading,
    isFetching,
    idDeleteDeck,
    nameDeleteDeck,
    setIdDeleteDeck,
    deleteDeck,
    setSearch,
    addDeck,
    isOpenAddModal,
    setIsOpenAddModal,
    idUpdateDeck,
    updateDeck,
    currentDeck,
    setIdUpdateDeck,
    data: currentData,
    setTabsValue,
    tabsValue,
    clearSettingsHandler,
    changeValueSliderHandler,
    commitValueSliderHandler,
    sort,
    setSort,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    search,
    setItemsPerPage,
    valuesSlider,
    myId,
  }
}
