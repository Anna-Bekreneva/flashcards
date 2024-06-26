import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

import { CurrentDeckType, Sort, UpdateDeckType } from '@/components'
import {
  cardsActions,
  useAppDispatch,
  useAppSelector,
  useCreateCardMutation,
  useDeleteCardMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useLazyGetDeckQuery,
  useUpdateCardMutation,
  useUpdateDeckMutation,
  selectCardCurrentPage,
  selectCardItemsPerPage,
  selectCardSearch,
  selectCardSort,
  useMeQuery,
} from '@/services'

export const useDeckPage = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()

  const currentPage = useAppSelector(selectCardCurrentPage)
  const itemsPerPage = useAppSelector(selectCardItemsPerPage)
  const search = useAppSelector(selectCardSearch)
  const [searchWithDebounce] = useDebounce(search, 1000)
  const sort = useAppSelector(selectCardSort)

  const setCurrentPage = (currentPage: number) => dispatch(cardsActions.setCurrentPage(currentPage))
  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(cardsActions.setItemsPerPage(itemsPerPage))
  const setSearch = (search: string) => dispatch(cardsActions.setSearch(search))
  const setSort = (sort: Sort) => dispatch(cardsActions.setSort(sort))

  const { data: deck } = useGetDeckQuery({ id: id ?? '' })
  const {
    currentData: cards,
    isLoading,
    isFetching,
  } = useGetCardsQuery({
    id: id || '',
    orderBy: sort && `${sort.key}-${sort.direction}`,
    question: searchWithDebounce,
    itemsPerPage,
    currentPage,
  })

  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateGetDeck] = useLazyGetDeckQuery()
  const { data: meData } = useMeQuery()

  const deleteCardHandler = (id: string) => deleteCard({ id }).unwrap()
  const deleteDeckHandler = async (id: string) => {
    deleteDeck(id)
    goBack()
  }
  const currentDeck: CurrentDeckType = {
    name: deck?.name,
    isPrivate: deck?.isPrivate,
    cover: deck?.cover ?? '',
  }

  //modals:
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [idDeleteCard, setIdDeleteCard] = useState('')
  const nameDeleteCard = cards?.items.find(card => card.id === idDeleteCard)?.question
  const [idUpdateCard, setIdUpdateCard] = useState('')
  const currentCard = cards?.items.find(card => card.id === idUpdateCard)
  const [idDeleteDeck, setIdDeleteDeck] = useState('')
  const [idUpdateDeck, setIdUpdateDeck] = useState('')

  const updateDeckHandler = async (data: UpdateDeckType) => {
    updateDeck({ ...data, id: idUpdateDeck || '' }).then(() =>
      updateGetDeck({ id: idUpdateDeck || '' })
    )
  }

  //navigation:
  const navigate = useNavigate()
  const goBack = () => navigate('/')
  const isMyDeck = deck?.userId === meData?.id

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    search,
    setSearch,
    sort,
    setSort,
    deck,
    cards,
    isLoading,
    isFetching,
    createCard,
    updateCard,
    deleteCard,
    deleteDeckHandler,
    currentDeck,
    isOpenAddModal,
    setIsOpenAddModal,
    idDeleteCard,
    setIdDeleteCard,
    nameDeleteCard,
    idUpdateCard,
    setIdUpdateCard,
    currentCard,
    idDeleteDeck,
    setIdDeleteDeck,
    idUpdateDeck,
    setIdUpdateDeck,
    updateDeckHandler,
    deleteCardHandler,
    goBack,
    isMyDeck,
  }
}
