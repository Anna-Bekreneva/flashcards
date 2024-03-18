import { useEffect, useState } from 'react'

import { useDebounce } from 'use-debounce'

import { Sort } from '@/components'
import { MY_ID } from '@/pages'
import {
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
  const [deleteDeck] = useDeleteDeckMutation()
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const [addDeck] = useCreateDeckMutation()
  const [cardsCountLocal, setCardsCountLocal] = useState([0, DEFAULT_MAX_CARDS_COUNT])
  const [cardsCount, setCardsCount] = useState([cardsCountLocal[0], cardsCountLocal[1]])
  const [name, setName] = useState('')
  const [searchWithDebounce] = useDebounce(name, 1000)

  const [updateDeck] = useUpdateDeckMutation()
  // tabs
  const [tabsValue, setTabsValue] = useState<TabsVariantType>(TabsVariant.allCards)
  const authorId = tabsValue === 'my' ? MY_ID : ''
  const [sort, setSort] = useState<Sort>(null)
  const { data, isLoading, isFetching } = useGetDecksQuery({
    minCardsCount: cardsCount[0],
    maxCardsCount: cardsCount[1],
    name: searchWithDebounce,
    currentPage,
    itemsPerPage: perPage,
    authorId,
    orderBy: sort ? `${sort?.key}-${sort?.direction}` : null,
  })

  useEffect(() => {
    if (!data || !data.maxCardsCount) return
    setCardsCountLocal([cardsCountLocal[0], data?.maxCardsCount ?? DEFAULT_MAX_CARDS_COUNT])
  }, [data?.maxCardsCount])

  // update modal
  const [idUpdateDeck, setIdUpdateDeck] = useState<string>('')
  const deckForUpdate = data?.items.find(item => item.id === idUpdateDeck)

  // delete modal
  const [idDeleteDeck, setIdDeleteDeck] = useState('')
  const nameDeleteDeck = data?.items.find(item => item.id === idDeleteDeck)?.name

  // add modal
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const clearSettingsHandler = () => {
    setName('')
    setTabsValue(TabsVariant.allCards)
    setCardsCountLocal([0, data?.maxCardsCount ?? 100])
    setCardsCount([0, data?.maxCardsCount ?? 100])
  }
  const changeValueSliderHandler = (values: number[]) => setCardsCountLocal([values[0], values[1]])

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
    data,
    setName,
    setTabsValue,
    tabsValue,
    cardsCountLocal,
    setCardsCount,
    clearSettingsHandler,
    changeValueSliderHandler,
    sort,
    setSort,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    name,
  }
}
