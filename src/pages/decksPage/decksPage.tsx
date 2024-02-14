import { useEffect, useState } from 'react'

import s from './decksPage.module.scss'

import { DeleteIcon } from '@/assets/iconsComponents'
import { ButtonVariant } from '@/common'
import {
  AddDeckModal,
  Button,
  DecksHeader,
  DecksPagination,
  DecksTable,
  DeleteDeckModal,
  SliderCustom,
  Sort,
  Tabs,
  TabsList,
  TabsTrigger,
  TextField,
  Typography,
  UpdateDeckModal,
} from '@/components'
import { Preloader } from '@/components/ui/preloader'
import { ProgressBar } from '@/components/ui/progressBar'
import { useGetDecksQuery } from '@/services'

export const MY_ID = 'f2be95b9-4d07-4751-a775-bd612fc9553a'
const DEFAULT_MAX_CARDS_COUNT = 100

export const DecksPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const [cardsCountLocal, setCardsCountLocal] = useState([0, DEFAULT_MAX_CARDS_COUNT])
  const [cardsCount, setCardsCount] = useState([cardsCountLocal[0], cardsCountLocal[1]])
  const [name, setName] = useState('')

  // tabs
  const [tabsValue, setTabsValue] = useState<TabsVariantType>(TabsVariant.allCards)
  const authorId = tabsValue === 'my' ? MY_ID : ''
  const [sort, setSort] = useState<Sort>(null)
  const { data, isLoading, isFetching, error } = useGetDecksQuery({
    minCardsCount: cardsCount[0],
    maxCardsCount: cardsCount[1],
    name,
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
  const [idUpdateDeck, setIdUpdateDeck] = useState<string | null>(null)
  const updateDeck = data?.items.find(item => item.id === idUpdateDeck)

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

  if (error) {
    if ('data' in error) {
      const errMsg = error.data as ErrorDataType

      if ('error' in errMsg) {
        return <h1>{errMsg.error}</h1>
      }
    } else if ('error' in error) {
      return <h1>{error.error}</h1>
    }
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {isFetching && <ProgressBar />}
      <section className={'container section'}>
        <DeleteDeckModal
          key={idDeleteDeck}
          nameDeleteDeck={nameDeleteDeck ?? ''}
          idDeleteDeck={idDeleteDeck}
          title={'Delete Pack'}
          isOpen={!!idDeleteDeck}
          onOpenChange={() => setIdDeleteDeck('')}
        />

        <AddDeckModal
          title={'Add New Pack'}
          isOpen={isOpenAddModal}
          onOpenChange={() => setIsOpenAddModal(!isOpenAddModal)}
        />

        <UpdateDeckModal
          key={idUpdateDeck}
          currentDeck={{
            name: updateDeck?.name,
            isPrivate: updateDeck?.isPrivate,
            cover: updateDeck?.cover ?? '',
          }}
          title={'Edit Pack'}
          openChangeHandler={() => setIdUpdateDeck('')}
          id={idUpdateDeck ?? ''}
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
            value={name}
            onValueChange={value => setName(value)}
            disabled={isFetching}
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
              value={[cardsCountLocal[0], cardsCountLocal[1]]}
              onValueChange={changeValueSliderHandler}
              onValueCommit={values => {
                changeValueSliderHandler(values)
                setCardsCount([values[0], values[1]])
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
            perPage={perPage}
            setItemsPerPage={setPerPage}
          />
        ) : null}
      </section>
    </>
  )
}

const TabsVariant = {
  myCards: 'my',
  allCards: 'all',
} as const

type ErrorDataType = {
  error: string
  errorObject: Object
  in: string
  info: string
}

type TabsVariantType = (typeof TabsVariant)[keyof typeof TabsVariant]
