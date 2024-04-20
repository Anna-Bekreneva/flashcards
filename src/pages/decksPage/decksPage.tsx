import s from './decksPage.module.scss'

import { DeleteIcon } from '@/assets/iconsComponents'
import { ButtonVariant } from '@/common'
import {
  Button,
  DeckModal,
  DecksHeader,
  DecksPagination,
  DecksTable,
  DeleteModal,
  Preloader,
  ProgressBar,
  SliderCustom,
  Tabs,
  TabsList,
  TabsTrigger,
  TextField,
  Typography,
} from '@/components'
import { TabsVariant, TabsVariantType, useDecksPage } from '@/pages'

export const MY_ID = 'f8174b52-147a-4085-b190-20472f2bfa2d'
const DEFAULT_MAX_CARDS_COUNT = 100

export const DecksPage = () => {
  const {
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
    setMaxCardsCount,
    setMinCardsCount,
    maxCardsCount,
    minCardsCount,
    clearSettingsHandler,
    changeValueSliderHandler,
    sort,
    setSort,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    search,
    setItemsPerPage,
  } = useDecksPage(DEFAULT_MAX_CARDS_COUNT)

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {isFetching && <ProgressBar />}
      <section className={'container section'}>
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
          callBack={data => addDeck(data)}
          agreeText={'Add New Pack'}
          title={'Add New Pack'}
          isOpen={isOpenAddModal}
          onOpenChange={() => setIsOpenAddModal(!isOpenAddModal)}
        />

        {/* update */}
        <DeckModal
          key={idUpdateDeck ? idUpdateDeck : 'update-deck-modal'}
          callBack={data => updateDeck({ ...data, id: idUpdateDeck })}
          agreeText={'Save Changes'}
          currentDeck={currentDeck}
          isOpen={!!idUpdateDeck}
          title={'Edit Pack'}
          onOpenChange={() => setIdUpdateDeck('')}
        />
        <DecksHeader
          isOpenAddModal={isOpenAddModal}
          setIsOpenAddModal={setIsOpenAddModal}
          count={data?.pagination.totalItems}
        />

        <div className={s.settings}>
          <TextField
            type={'search'}
            placeholder={'Input search'}
            value={search}
            onValueChange={setName}
          />
          <div className={s.setting}>
            <Typography as={'span'}>Show packs cards</Typography>
            <Tabs value={tabsValue} onValueChange={value => setTabsValue(value as TabsVariantType)}>
              <TabsList>
                <TabsTrigger value={TabsVariant.allCards} type={'button'} disabled={isFetching}>
                  All Cards
                </TabsTrigger>
                <TabsTrigger value={TabsVariant.myCards} type={'button'} disabled={isFetching}>
                  My Cards
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className={s.setting}>
            <Typography as={'span'}>Number of cards</Typography>
            <SliderCustom
              max={data?.maxCardsCount}
              value={[minCardsCount ?? 0, maxCardsCount ?? 50]}
              onValueChange={changeValueSliderHandler}
              onValueCommit={values => {
                changeValueSliderHandler(values)
                setMinCardsCount(values[0])
                setMaxCardsCount(values[1])
              }}
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

        <DecksTable
          id={MY_ID}
          items={data?.items}
          setIdDeleteDeck={setIdDeleteDeck}
          setIdUpdateDeck={setIdUpdateDeck}
          sort={sort}
          setSort={setSort}
          disabled={isFetching}
        />
        {data?.pagination.totalPages && data?.pagination.totalPages > 1 ? (
          <DecksPagination
            totalPages={data?.pagination?.totalPages ?? 0}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        ) : null}
      </section>
    </>
  )
}
