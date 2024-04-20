import { useEffect, useState } from 'react'

import { useDebounce } from 'use-debounce'

import { Sort } from '@/components'
import { MY_ID } from '@/pages'
import {
  decksSlice,
  useAppDispatch,
  useAppSelector,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services'

export const TabsVariant = {
  myCards: 'my',
  allCards: 'all',
} as const

export type TabsVariantType = (typeof TabsVariant)[keyof typeof TabsVariant]
export const useDecksPage = (DEFAULT_MAX_CARDS_COUNT: number) => {
  const dispatch = useAppDispatch()
  const [deleteDeck] = useDeleteDeckMutation()

  const currentPage = useAppSelector(state => state.decks.currentPage)
  const setCurrentPage = (currentPage: number) => {
    dispatch(decksSlice.actions.setCurrentPage(currentPage))
  }

  const setItemsPerPage = (itemsPerPage: number) => {
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))
  }
  const itemsPerPage = useAppSelector(state => state.decks.itemsPerPage)

  const minCardsCount = useAppSelector(state => state.decks.minCardsCount)
  const setMinCardsCount = (minCardsCount: number) => {
    dispatch(decksSlice.actions.setMinCardsCount(minCardsCount))
  }

  const maxCardsCount = useAppSelector(state => state.decks.maxCardsCount)
  const setMaxCardsCount = (maxCardsCount: number) => {
    dispatch(decksSlice.actions.setMaxCardsCount(maxCardsCount))
  }

  const [addDeck] = useCreateDeckMutation()
  //const [cardsCount, setCardsCount] = useState([0, DEFAULT_MAX_CARDS_COUNT])
  //const [cardsCountWithDebounce] = useDebounce(cardsCount, 1000)
  const [search, setName] = useState('')
  const [searchWithDebounce] = useDebounce(search, 1000)

  const [updateDeck] = useUpdateDeckMutation()
  // tabs
  const [tabsValue, setTabsValue] = useState<TabsVariantType>(TabsVariant.allCards)
  const authorId = tabsValue === 'my' ? MY_ID : ''
  const [sort, setSort] = useState<Sort>(null)
  const { currentData, isLoading, isFetching } = useGetDecksQuery({
    minCardsCount,
    maxCardsCount,
    name: searchWithDebounce,
    currentPage,
    itemsPerPage,
    authorId,
    orderBy: sort ? `${sort?.key}-${sort?.direction}` : null,
  })

  useEffect(() => {
    if (!currentData || !currentData.maxCardsCount) return
    setMaxCardsCount(currentData?.maxCardsCount ?? DEFAULT_MAX_CARDS_COUNT)
    // setCardsCount([cardsCount[0], currentData?.maxCardsCount ?? DEFAULT_MAX_CARDS_COUNT])
  }, [currentData?.maxCardsCount])

  // update modal
  const [idUpdateDeck, setIdUpdateDeck] = useState<string>('')
  const deckForUpdate = currentData?.items.find(item => item.id === idUpdateDeck)

  // delete modal
  const [idDeleteDeck, setIdDeleteDeck] = useState('')
  const nameDeleteDeck = currentData?.items.find(item => item.id === idDeleteDeck)?.name

  // add modal
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const clearSettingsHandler = () => {
    setName('')
    setTabsValue(TabsVariant.allCards)
    setMaxCardsCount(currentData?.maxCardsCount ?? 100)
    // setCardsCount([0, currentData?.maxCardsCount ?? 100])
  }
  const changeValueSliderHandler = (values: number[]) => {
    //setCardsCount([values[0], values[1]])
    setMaxCardsCount(values[1])
    setMinCardsCount(values[0])
  }

  const currentDeck = {
    name: deckForUpdate?.name,
    isPrivate: deckForUpdate?.isPrivate,
    cover: deckForUpdate?.cover ?? '',
  }

  return {
    isLoading,
    isFetching,
    idDeleteDeck,
    nameDeleteDeck,
    setIdDeleteDeck,
    deleteDeck,
    addDeck,
    isOpenAddModal,
    setIsOpenAddModal,
    idUpdateDeck,
    updateDeck,
    currentDeck,
    setIdUpdateDeck,
    data: currentData,
    setName,
    setTabsValue,
    tabsValue,
    clearSettingsHandler,
    changeValueSliderHandler,
    sort,
    setSort,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    search,
    setItemsPerPage,
    setMaxCardsCount,
    setMinCardsCount,
    maxCardsCount,
    minCardsCount,
  }
}
