import { FC, useState } from 'react'

import { NavLink, useNavigate, useParams } from 'react-router-dom'

import s from './deckPage.module.scss'

import { DeleteIcon, EditIcon, PlayIcon } from '@/assets/iconsComponents'
import { TypographyVariant } from '@/common'
import {
  CardModal,
  Button,
  CardsTable,
  DecksHeader,
  DeleteModal,
  DropDownMenu,
  NotFound,
  Sort,
  TextField,
  Typography,
  DeckModal,
  DecksPagination,
} from '@/components'
import { Preloader } from '@/components/ui/preloader'
import { ProgressBar } from '@/components/ui/progressBar'
import { MY_ID } from '@/pages'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useLazyGetDeckQuery,
  useUpdateCardMutation,
  useUpdateDeckMutation,
} from '@/services'

export const DeckPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const { id: deckId } = useParams()
  const { data: deck } = useGetDeckQuery({ id: deckId ?? '' })
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<Sort>(null)
  const {
    data: cards,
    isLoading,
    isFetching,
  } = useGetCardsQuery({
    id: deckId || '',
    orderBy: sort ? `${sort?.key}-${sort?.direction}` : '',
    currentPage,
    itemsPerPage: perPage,
    question: search,
  })
  const [createCard] = useCreateCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [updateGetDeck] = useLazyGetDeckQuery()

  // Навигация
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  // Модалки
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)

  const [idDeleteCard, setIdDeleteCard] = useState('')
  const nameDeleteCard = cards?.items.find(card => card.id === idDeleteCard)?.question

  const [idUpdateCard, setIdUpdateCard] = useState('')
  const currentUpdateCard = cards?.items.find(card => card.id === idUpdateCard)

  const [idDeleteDeck, setIdDeleteDeck] = useState('')

  const [idUpdateDeck, setIdUpdateDeck] = useState('')

  const currentDeckInfo = {
    name: deck?.name,
    isPrivate: deck?.isPrivate,
    cover: deck?.cover ?? '',
  }
  const deleteDeckHandler = (value: { id: string }): void => {
    deleteDeck(value)
    goBack()
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {isFetching && <ProgressBar />}
      <section className={'container section'}>
        {/* Добавление карточки */}
        <CardModal
          key={Math.random()}
          title={'Add New Card'}
          isOpen={isOpenAddModal}
          agreeText={'Add New Card'}
          onOpenChange={() => setIsOpenAddModal(!isOpenAddModal)}
          callback={data => {
            createCard({ ...data, id: deckId ?? '' })
            updateGetDeck({ id: deckId ?? '' })
          }}
        />

        {/* Обнавление карточки */}
        <CardModal
          key={idUpdateCard}
          title={'Edit Card'}
          isOpen={!!idUpdateCard}
          agreeText={'Save Changes'}
          onOpenChange={() => setIdUpdateCard('')}
          currentCard={currentUpdateCard}
          callback={data => updateCard({ ...data, id: idUpdateCard })}
        />

        {/* Удаление карточки */}
        <DeleteModal
          deleteCallback={deleteCard}
          isOpen={!!idDeleteCard}
          idDelete={idDeleteCard}
          title={'Delete Card'}
          nameDelete={nameDeleteCard || ''}
          onOpenChange={() => setIdDeleteCard('')}
        />

        {/* Удаление деки */}
        <DeleteModal
          key={idDeleteDeck}
          deleteCallback={deleteDeckHandler}
          nameDelete={deck?.name ?? ''}
          idDelete={idDeleteDeck}
          title={'Delete Pack'}
          isOpen={!!idDeleteDeck}
          onOpenChange={() => setIdDeleteDeck('')}
        />

        {/* Обновление деки */}
        <DeckModal
          callBack={data => {
            updateDeck({ ...data, id: idUpdateDeck || '' })
            updateGetDeck({ id: idUpdateDeck || '' })
          }}
          key={idUpdateDeck}
          currentDeck={currentDeckInfo}
          title={'Edit Pack'}
          onOpenChange={() => setIdUpdateDeck('')}
          isOpen={!!idUpdateDeck}
          agreeText={'Save Changes'}
        />

        <button className={'back'} onClick={goBack}>
          Back to Packs List
        </button>
        <DecksHeader
          className={s.header}
          disabled={isFetching}
          setIsOpenAddModal={setIsOpenAddModal}
          count={deck?.cardsCount && deck?.cardsCount > 0 ? deck?.cardsCount : undefined}
          title={deck?.name}
          buttonText={deck?.userId === MY_ID ? 'Add new Card' : 'Learn to Pack'}
          cover={deck?.cover}
          to={deck?.userId === MY_ID ? '' : 'Learn to Pack'}
          isShowButton={!!cards?.items.length}
        >
          {deck?.userId === MY_ID ? (
            <DeckPageHeaderDropDown
              id={deck.userId}
              learn={!!cards?.items.length}
              disabled={isFetching}
              deleteCallback={() => setIdDeleteDeck(deckId ?? '')}
              editCallback={() => setIdUpdateDeck(deckId ?? '')}
            />
          ) : null}
        </DecksHeader>
        {cards?.items.length ? (
          <TextField
            className={s.search}
            type={'search'}
            placeholder={'Input search'}
            value={search}
            onValueChange={value => setSearch(value)}
          />
        ) : null}

        {!cards?.items.length && deck?.userId === MY_ID ? (
          <NotFound className={s.notFound}>
            <Typography variant={TypographyVariant.body1}>
              This pack is empty. Click add new card to fill this pack
            </Typography>
            <Button onClick={() => setIsOpenAddModal(true)} type={'button'} disabled={isFetching}>
              Add New Card
            </Button>
          </NotFound>
        ) : (
          <CardsTable
            cards={cards?.items}
            sort={sort}
            setSort={setSort}
            editCallback={setIdUpdateCard}
            deleteCallback={setIdDeleteCard}
            disabled={isFetching}
          />
        )}

        {cards?.pagination.totalPages && cards?.pagination.totalPages > 1 ? (
          <DecksPagination
            totalPages={cards?.pagination?.totalPages ?? 0}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
            setItemsPerPage={setPerPage}
          />
        ) : null}
      </section>
    </>
  )
}

type DeckPageHeaderDropDownProps = {
  id: string
  learn: boolean
  disabled?: boolean
  deleteCallback: () => void
  editCallback: () => void
}
const DeckPageHeaderDropDown: FC<DeckPageHeaderDropDownProps> = ({
  id,
  learn,
  deleteCallback,
  editCallback,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropDownMenu
      open={isOpen}
      onOpenChange={setIsOpen}
      className={s.dropdown}
      trigger={
        <button
          className={s.trigger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={'manage deck'}
        />
      }
    >
      <ul>
        {learn && (
          <li className={s.dropdownItem}>
            <NavLink className={s.dropdownAction} to={`/decks/deck/cards/${id}`}>
              <PlayIcon width={16} height={16} /> Learn
            </NavLink>
          </li>
        )}
        <li className={s.dropdownItem}>
          <button
            className={s.dropdownAction}
            onClick={() => {
              editCallback()
              setIsOpen(false)
            }}
            type={'button'}
            disabled={disabled}
          >
            <EditIcon width={16} height={16} /> Edit
          </button>
        </li>
        <li className={s.dropdownItem}>
          <button
            className={s.dropdownAction}
            onClick={() => {
              deleteCallback()
              setIsOpen(false)
            }}
            type={'button'}
            disabled={disabled}
          >
            <DeleteIcon width={16} height={16} /> Delete
          </button>
        </li>
      </ul>
    </DropDownMenu>
  )
}
