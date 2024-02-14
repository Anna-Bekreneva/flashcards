import { useState } from 'react'

import { nanoid } from '@reduxjs/toolkit'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import s from './deckPage.module.scss'

import { DeleteIcon, EditIcon, PlayIcon } from '@/assets/iconsComponents'
import notFoundImg from '@/assets/images/not-found.png'
import { TypographyVariant } from '@/common'
import {
  Button,
  DecksHeader,
  DecksPagination,
  DropDownMenu,
  NotFound,
  Sort,
  TextField,
  Typography,
} from '@/components'
import { CardModal } from '@/components/cards/cardModal'
import { CardsTable } from '@/components/cards/cardsTable/cardsTable.tsx'
import { DeckModal } from '@/components/decks/decksModals/deckModal'
import { DeleteModal } from '@/components/ui/deleteModal'
import { GoBack } from '@/components/ui/goBack'
import { Preloader } from '@/components/ui/preloader'
import { ProgressBar } from '@/components/ui/progressBar'
import { MY_ID } from '@/pages'
import {
  useDeleteDeckMutation,
  useGetDeckQuery,
  useLazyGetDeckQuery,
  useUpdateDeckMutation,
} from '@/services'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} from '@/services/cards'

export const DeckPage = () => {
  const { id } = useParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<Sort>(null)

  const { data: deck } = useGetDeckQuery({ id: id ?? '' })
  const {
    data: cards,
    isLoading,
    isFetching,
  } = useGetCardsQuery({
    id: id || '',
    orderBy: sort && `${sort.key}-${sort.direction}`,
    question: search,
    itemsPerPage,
    currentPage,
  })

  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateGetDeck] = useLazyGetDeckQuery()

  const deleteDeckHandler = (arg: { id: string }): void => {
    deleteDeck(arg.id)
    goBack()
  }
  const currentDeck = {
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

  //navigation:
  const navigate = useNavigate()
  const goBack = () => navigate('/')

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {isFetching && <ProgressBar />}
      <section className={`container section ${s.wrapper}`}>
        {/*add card modal: */}
        <CardModal
          key={nanoid()}
          onOpenChange={() => setIsOpenAddModal(!isOpenAddModal)}
          isOpen={isOpenAddModal}
          callback={createCard}
          title={'Add New Card'}
          submitBtnCaption={'Add New Card'}
        />
        {/*update card modal*/}
        <CardModal
          key={idUpdateCard}
          onOpenChange={() => setIdUpdateCard('')}
          isOpen={!!idUpdateCard}
          callback={data => updateCard({ ...data, id: idUpdateCard })}
          title={'Edit Card'}
          submitBtnCaption={'Save Changes'}
          currentCard={currentCard}
        />
        {/*delete card modal*/}
        <DeleteModal
          key={idDeleteCard}
          idDelete={idDeleteCard}
          nameDelete={nameDeleteCard || ''}
          title={'Delete Card'}
          isOpen={!!idDeleteCard}
          onOpenChange={() => setIdDeleteCard('')}
          deleteCallback={deleteCard}
        />
        {/*delete deck modal*/}
        <DeleteModal
          key={idDeleteDeck}
          idDelete={idDeleteDeck}
          deleteCallback={deleteDeckHandler}
          onOpenChange={() => setIdDeleteDeck('')}
          isOpen={!!idDeleteDeck}
          title={'Delete Pack'}
          nameDelete={deck?.name ?? ''}
        />
        {/*update deck modal*/}
        <DeckModal
          key={idUpdateDeck}
          title={'Edit Pack'}
          isOpen={!!idUpdateDeck}
          onOpenChange={() => setIdUpdateDeck('')}
          agreeText={'Save Changes'}
          callBack={data => {
            updateDeck({ ...data, id: idUpdateDeck || '' })
            updateGetDeck({ id: idUpdateDeck || '' })
          }}
          currentDeck={currentDeck}
        />
        <GoBack text={'Back to Packs List'} clickHandler={goBack} />
        <DecksHeader
          className={s.header}
          isOpenAddModal={isOpenAddModal}
          setIsOpenAddModal={setIsOpenAddModal}
          count={deck?.cardsCount}
          title={deck?.name}
          buttonText={'Add new card'}
          cover={deck?.cover}
          to={'Learn pack'}
        >
          {deck?.userId === MY_ID ? (
            <DeckPageHeaderDropDown
              deckId={deck.id}
              learn={!!cards?.items.length}
              disabled={isFetching}
              deleteCallBack={() => setIdDeleteDeck(deck.id)}
              editCallBack={() => setIdUpdateDeck(deck.id)}
              isModalOpen={!!idUpdateDeck || !!idDeleteDeck}
            />
          ) : null}
        </DecksHeader>
        <TextField
          className={s.search}
          type={'search'}
          placeholder={'Input search'}
          value={search}
          onValueChange={value => setSearch(value)}
        />
        {!cards?.items.length && deck?.userId === MY_ID && (
          <NotFound className={s.notFound}>
            <Typography variant={TypographyVariant.body1}>
              This pack is empty. Click add new card to fill this pack
            </Typography>
            <Button onClick={() => setIsOpenAddModal(true)} disabled={isFetching}>
              Add New Card
            </Button>
          </NotFound>
        )}

        {cards?.items.length ? (
          <CardsTable
            cards={cards?.items}
            sort={sort}
            setSort={setSort}
            deleteCard={setIdDeleteCard}
            editCard={setIdUpdateCard}
            disabled={isFetching}
          />
        ) : (
          <NotFound className={s.notFound}>
            <img src={notFoundImg} alt="Not found" width={400} height={200} />
            <Typography variant={TypographyVariant.h3}> Decks not found </Typography>
          </NotFound>
        )}
        {!cards?.items.length && (
          <Typography variant={TypographyVariant.body1}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Didn't find any card with such question
          </Typography>
        )}
        {cards?.pagination.totalPages && cards?.pagination.totalPages > 1 ? (
          <DecksPagination
            totalPages={cards.pagination.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            perPage={itemsPerPage}
          />
        ) : null}
      </section>
    </>
  )
}

type DeckPageHeaderDropDownProps = {
  deckId: string
  learn: boolean
  disabled?: boolean
  deleteCallBack: () => void
  editCallBack: () => void
  isModalOpen: boolean
}
const DeckPageHeaderDropDown = ({
  deckId,
  deleteCallBack,
  editCallBack,
  disabled = false,
  learn,
  isModalOpen,
}: DeckPageHeaderDropDownProps) => {
  return (
    <DropDownMenu
      className={s.dropdown}
      trigger={<button className={s.trigger} aria-label={'manage deck'} />}
      hidden={isModalOpen}
    >
      <ul>
        {learn && (
          <li className={s.dropdownItem}>
            <NavLink className={s.dropdownAction} to={`/decks/deck/cards/${deckId}`}>
              <PlayIcon width={16} height={16} /> Learn
            </NavLink>
          </li>
        )}
        <li className={s.dropdownItem}>
          <button className={s.dropdownAction} onClick={() => editCallBack()} disabled={disabled}>
            <EditIcon width={16} height={16} /> Edit
          </button>
        </li>
        <li className={s.dropdownItem}>
          <button className={s.dropdownAction} onClick={() => deleteCallBack()} disabled={disabled}>
            <DeleteIcon width={16} height={16} /> Delete
          </button>
        </li>
      </ul>
    </DropDownMenu>
  )
}
