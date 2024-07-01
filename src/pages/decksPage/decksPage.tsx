import s from './decksPage.module.scss'

import { DeleteIcon } from '@/assets/iconsComponents'
import notFoundImg from '@/assets/images/not-found.png'
import { ButtonVariant, DecksTabsVariant, DecksTabsVariantType, TypographyVariant } from '@/common'
import {
  Button,
  DeckModal,
  DecksHeader,
  DecksPagination,
  DecksTable,
  DeleteModal,
  NotFound,
  Preloader,
  ProgressBar,
  SliderCustom,
  Tabs,
  TabsList,
  TabsTrigger,
  TextField,
  Typography,
} from '@/components'
import { useDecksPage } from '@/pages'

export const DecksPage = () => {
  const {
    isLoading,
    isFetching,
    idDeleteDeck,
    nameDeleteDeck,
    setIdDeleteDeck,
    deleteDeck,
    addDeckHandle,
    isOpenAddModal,
    setIsOpenAddModal,
    idUpdateDeck,
    updateDeck,
    currentDeck,
    setIdUpdateDeck,
    data,
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
    setSearch,
    valuesSlider,
    myId,
  } = useDecksPage()

  if (isLoading) {
    return <Preloader />
  }

  console.log(isFetching)

  return (
    <>
      {isFetching && <ProgressBar />}
      <section className={'section'}>
        <div className={'container'}>
          <DeleteModal
            key={idDeleteDeck ? idDeleteDeck : 'delete-deck-modal'}
            nameDelete={nameDeleteDeck ?? ''}
            idDelete={idDeleteDeck}
            title={'Delete Pack'}
            isOpen={!!idDeleteDeck}
            onOpenChange={() => setIdDeleteDeck('')}
            deleteCallback={id => deleteDeck(id)}
          />

          {/* add */}
          <DeckModal
            callBack={addDeckHandle}
            agreeText={'Add New Pack'}
            title={'Add New Pack'}
            isOpen={isOpenAddModal}
            onOpenChange={() => setIsOpenAddModal(!isOpenAddModal)}
          />

          {/* update */}
          <DeckModal
            key={idUpdateDeck ? idUpdateDeck : 'update-deck-modal'}
            callBack={data => updateDeck({ ...data, id: idUpdateDeck }).unwrap()}
            agreeText={'Save Changes'}
            currentDeck={currentDeck}
            isOpen={!!idUpdateDeck}
            title={'Edit Pack'}
            onOpenChange={() => setIdUpdateDeck('')}
          />
          <DecksHeader
            count={data?.pagination.totalItems}
            actionElement={
              <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)} type={'button'}>
                Add New Pack
              </Button>
            }
          />
          <div className={s.settings}>
            <TextField
              type={'search'}
              placeholder={'Input search'}
              value={search}
              onValueChange={setSearch}
              disabled={isFetching}
            />
            <div className={s.setting}>
              <Typography as={'span'}>Show packs cards</Typography>
              <Tabs
                value={tabsValue}
                onValueChange={value => setTabsValue(value as DecksTabsVariantType)}
              >
                <TabsList>
                  <TabsTrigger
                    value={DecksTabsVariant.allCards}
                    type={'button'}
                    disabled={isFetching}
                  >
                    All Cards
                  </TabsTrigger>
                  <TabsTrigger
                    value={DecksTabsVariant.myCards}
                    type={'button'}
                    disabled={isFetching}
                  >
                    My Cards
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className={s.setting}>
              <Typography as={'span'}>Number of cards</Typography>
              <SliderCustom
                max={data?.maxCardsCount}
                value={valuesSlider}
                onValueChange={changeValueSliderHandler}
                onValueCommit={commitValueSliderHandler}
                disabled={isFetching}
              />
            </div>
            <Button
              className={s.clear}
              onClick={clearSettingsHandler}
              type={'button'}
              variant={ButtonVariant.secondary}
            >
              <DeleteIcon />
              Clear Filter
            </Button>
          </div>

          {data?.items.length && (
            <DecksTable
              id={myId ?? ''}
              items={data?.items}
              setIdDeleteDeck={setIdDeleteDeck}
              setIdUpdateDeck={setIdUpdateDeck}
              sort={sort}
              setSort={setSort}
              disabled={isFetching}
            />
          )}

          {!data?.items.length && !isFetching && (
            <NotFound className={s.notFound}>
              <img src={notFoundImg} alt="Not found" width={400} height={200} />
              <Typography variant={TypographyVariant.h3}> Decks not found </Typography>
            </NotFound>
          )}
          {data?.pagination.totalPages && data?.pagination.totalPages > 1 ? (
            <DecksPagination
              totalPages={data?.pagination?.totalPages ?? 0}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          ) : null}
        </div>
      </section>
    </>
  )
}
