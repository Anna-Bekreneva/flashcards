import { useState } from 'react'

import { NavLink, useNavigate, useParams } from 'react-router-dom'

import s from './deckPage.module.scss'

import { DeleteIcon, EditIcon, PlayIcon } from '@/assets/iconsComponents'
import { TypographyVariant } from '@/common'
import {
  DecksHeader,
  DecksPagination,
  DropDownMenu,
  NotFound,
  Sort,
  TextField,
  Typography,
  CardsTable,
  DeckModal,
  GoBack,
  Preloader,
  ProgressBar,
  CurrentDeckType,
  UpdateDeckType,
  DeleteModal,
  CardModal,
} from '@/components'
import { MY_ID } from '@/pages'
import {
  useDeleteDeckMutation,
  useGetDeckQuery,
  useLazyGetDeckQuery,
  useUpdateDeckMutation,
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} from '@/services'

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

  const deleteDeckHandler = (id: string): void => {
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

  const updateDeckHandler = (data: UpdateDeckType) => {
    updateDeck({ ...data, id: idUpdateDeck || '' }).then(() =>
      updateGetDeck({ id: idUpdateDeck || '' })
    )
  }

  //navigation:
  const navigate = useNavigate()
  const goBack = () => navigate('/')

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {isFetching && <ProgressBar />}
      <section className={`container section`}>
        {/*add card modal: */}
        <CardModal
          onOpenChange={() => setIsOpenAddModal(!isOpenAddModal)}
          isOpen={isOpenAddModal}
          callback={createCard}
          title={'Add New Card'}
          submitBtnCaption={'Add New Card'}
        />
        {/*/!*update card modal*!/*/}
        <CardModal
          key={idUpdateCard}
          onOpenChange={() => setIdUpdateCard('')}
          isOpen={!!idUpdateCard}
          callback={data => updateCard({ ...data, id: idUpdateCard })}
          title={'Edit Card'}
          submitBtnCaption={'Save Changes'}
          currentCard={{
            answerImg: currentCard?.answerImg ?? '',
            questionImg: currentCard?.questionImg ?? '',
            answer: currentCard?.answer ?? '',
            question: currentCard?.question ?? '',
          }}
        />
        {/*/!*delete card modal*!/*/}
        <DeleteModal
          idDelete={idDeleteCard}
          nameDelete={nameDeleteCard || ''}
          title={'Delete Card'}
          isOpen={!!idDeleteCard}
          onOpenChange={() => setIdDeleteCard('')}
          deleteCallback={id => deleteCard({ id })}
        />
        {/*/!*delete deck modal*!/*/}
        <DeleteModal
          idDelete={idDeleteDeck}
          deleteCallback={deleteDeckHandler}
          onOpenChange={() => setIdDeleteDeck('')}
          isOpen={!!idDeleteDeck}
          title={'Delete Pack'}
          nameDelete={deck?.name ?? ''}
        />
        {/*/!*update deck modal*!/*/}
        <DeckModal
          title={'Edit Pack'}
          isOpen={!!idUpdateDeck}
          onOpenChange={() => setIdUpdateDeck('')}
          agreeText={'Save Changes'}
          callBack={updateDeckHandler}
          currentDeck={currentDeck}
        />
        <GoBack text={'Back to Packs List'} clickHandler={goBack} />
        <DecksHeader
          className={s.header}
          isOpenAddModal={isOpenAddModal}
          setIsOpenAddModal={setIsOpenAddModal}
          count={deck?.cardsCount}
          title={deck?.name}
          as={deck?.userId === MY_ID ? 'button' : 'link'}
          buttonText={deck?.userId === MY_ID ? 'Add new card' : 'Learn to Deck'}
          cover={deck?.cover}
          to={`/decks/deck/cards/${deck?.id}`}
        >
          {deck?.userId === MY_ID ? (
            <DeckPageHeaderDropDown
              deckId={deck.id}
              learn={!!cards?.items.length}
              disabled={isFetching}
              deleteCallBack={() => setIdDeleteDeck(deck.id)}
              editCallBack={() => setIdUpdateDeck(deck.id)}
            />
          ) : null}
        </DecksHeader>
        <TextField
          className={s.search}
          type={'search'}
          placeholder={'Input search'}
          value={search}
          onValueChange={value => setSearch(value)}
          name={'search'}
        />
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
          <NotFound>
            <Typography variant={TypographyVariant.body1}>
              This pack is empty. Click add new card to fill this pack
            </Typography>
          </NotFound>
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
}
const DeckPageHeaderDropDown = ({
  deckId,
  deleteCallBack,
  editCallBack,
  disabled = false,
  learn,
}: DeckPageHeaderDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropDownMenu
      open={isOpen}
      onOpenChange={setIsOpen}
      className={s.dropdown}
      trigger={<button className={s.trigger} aria-label={'manage deck'} />}
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
          <button
            className={s.dropdownAction}
            onClick={() => {
              editCallBack()
              setIsOpen(false)
            }}
            disabled={disabled}
          >
            <EditIcon width={16} height={16} /> Edit
          </button>
        </li>
        <li className={s.dropdownItem}>
          <button
            className={s.dropdownAction}
            onClick={() => {
              deleteCallBack()
              setIsOpen(false)
            }}
            disabled={disabled}
          >
            <DeleteIcon width={16} height={16} /> Delete
          </button>
        </li>
      </ul>
    </DropDownMenu>
  )
}
