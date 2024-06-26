import { NavLink } from 'react-router-dom'

import s from './deckPage.module.scss'

import { TypographyVariant } from '@/common'
import {
  Button,
  CardModal,
  CardsTable,
  DeckModal,
  DecksHeader,
  DecksPagination,
  DeleteModal,
  GoBack,
  NotFound,
  Preloader,
  ProgressBar,
  TextField,
  Typography,
} from '@/components'
import { DeckPageHeaderDropDown, useDeckPage } from '@/pages'

export const DeckPage = () => {
  const {
    isLoading,
    isFetching,
    idDeleteDeck,
    setIdDeleteDeck,
    deck,
    setIdUpdateDeck,
    idUpdateDeck,
    currentDeck,
    deleteDeckHandler,
    setCurrentPage,
    currentPage,
    setIdDeleteCard,
    setIdUpdateCard,
    nameDeleteCard,
    updateDeckHandler,
    idUpdateCard,
    currentCard,
    idDeleteCard,
    cards,
    createCard,
    updateCard,
    setItemsPerPage,
    itemsPerPage,
    setIsOpenAddModal,
    isOpenAddModal,
    sort,
    setSort,
    search,
    setSearch,
    deleteCardHandler,
    goBack,
    isMyDeck,
  } = useDeckPage()

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
          key={idUpdateCard ? idUpdateCard : 'update-card-modal'}
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
          key={idDeleteCard ? idDeleteCard : 'delete-card-modal'}
          idDelete={idDeleteCard}
          nameDelete={nameDeleteCard || ''}
          title={'Delete Card'}
          isOpen={!!idDeleteCard}
          onOpenChange={() => setIdDeleteCard('')}
          deleteCallback={deleteCardHandler}
        />
        {/*/!*delete deck modal*!/*/}
        <DeleteModal
          key={idDeleteDeck ? idDeleteDeck : 'delete-deck-modal'}
          idDelete={idDeleteDeck}
          deleteCallback={deleteDeckHandler}
          onOpenChange={() => setIdDeleteDeck('')}
          isOpen={!!idDeleteDeck}
          title={'Delete Pack'}
          nameDelete={deck?.name ?? ''}
        />
        {/*/!*update deck modal*!/*/}
        <DeckModal
          key={idUpdateDeck ? idUpdateDeck : 'update-deck-modal'}
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
          count={deck?.cardsCount}
          title={deck?.name}
          cover={deck?.cover}
          actionElement={
            cards?.items.length &&
            (isMyDeck ? (
              <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)} type={'button'}>
                Add new card
              </Button>
            ) : (
              <Button as={NavLink} to={`/decks/deck/cards/${deck?.id}`}>
                Learn to Deck
              </Button>
            ))
          }
        >
          {isMyDeck ? (
            <DeckPageHeaderDropDown
              deckId={deck?.id || ''}
              learn={!!cards?.items.length}
              disabled={isFetching}
              deleteCallBack={() => setIdDeleteDeck(deck?.id || '')}
              editCallBack={() => setIdUpdateDeck(deck?.id || '')}
            />
          ) : null}
        </DecksHeader>
        {cards?.items.length ? (
          <>
            <TextField
              className={s.search}
              type={'search'}
              placeholder={'Input search'}
              value={search}
              onValueChange={value => setSearch(value)}
              name={'search'}
            />
            <CardsTable
              cards={cards?.items}
              sort={sort}
              setSort={setSort}
              deleteCard={setIdDeleteCard}
              editCard={setIdUpdateCard}
              disabled={isFetching}
            />
          </>
        ) : (
          <NotFound>
            <Typography variant={TypographyVariant.body1}>
              This pack is empty.
              {isMyDeck && ' Click add new card to fill this pack'}
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
