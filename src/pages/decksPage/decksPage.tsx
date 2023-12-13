import { useState } from 'react'

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
  Tabs,
  TabsList,
  TabsTrigger,
  TextField,
  Typography,
  UpdateDeckModal,
} from '@/components'
import { ProgressBar } from '@/components/ui/progressBar'
import { useGetDecksQuery } from '@/services'

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

const MY_ID = 'f2be95b9-4d07-4751-a775-bd612fc9553a'

export const DecksPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const [minCardsCount, setMinCardsCount] = useState(0)
  const [maxCardsCount, setMaxCardsCount] = useState(100)

  const [countCards, setCountCards] = useState({ minCardsCount, maxCardsCount })
  const [name, setName] = useState('')

  // tabs
  const [tabsValue, setTabsValue] = useState<TabsVariantType>(TabsVariant.allCards)
  const authorId = tabsValue === 'my' ? MY_ID : ''

  const { data, isLoading, isFetching, error } = useGetDecksQuery({
    minCardsCount: countCards.minCardsCount,
    maxCardsCount: countCards.maxCardsCount,
    name,
    currentPage,
    itemsPerPage: perPage,
    authorId,
  })

  // update modal
  const [idUpdateDeck, setIdUpdateDeck] = useState('')
  const updateDeck = data?.items.find(item => item.id === idUpdateDeck)

  // delete modal
  const [idDeleteDeck, setIdDeleteDeck] = useState('')
  const nameDeleteDeck = data?.items.find(item => item.id === idDeleteDeck)?.name

  // add modal
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const clearSettingsHandler = () => {
    setName('')
    setTabsValue(TabsVariant.allCards)
    setMinCardsCount(0)
    setMaxCardsCount(10)
    setCountCards({ minCardsCount: 0, maxCardsCount: 10 })
  }
  const changeValueSliderHandler = (values: number[]) => {
    setMinCardsCount(values[0])
    setMaxCardsCount(values[1])
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    if ('data' in error) {
      const errMsg = error.data as ErrorDataType

      if ('error' in errMsg) {
        return <h1>{errMsg.error}</h1>
      }
    }
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
          id={idUpdateDeck}
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
          />
          <div className={s.setting}>
            <Typography as={'span'}>Show packs cards</Typography>
            <Tabs value={tabsValue} onValueChange={value => setTabsValue(value as TabsVariantType)}>
              <TabsList>
                <TabsTrigger value={TabsVariant.allCards} type={'button'}>
                  All Cards
                </TabsTrigger>
                <TabsTrigger value={TabsVariant.myCards} type={'button'}>
                  My Cards
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className={s.setting}>
            <Typography as={'span'}>Number of cards</Typography>
            <SliderCustom
              value={[minCardsCount, maxCardsCount]}
              onValueCommit={changeValueSliderHandler}
              onValueChange={values => {
                changeValueSliderHandler(values)
                setCountCards({ minCardsCount: values[0], maxCardsCount: values[1] })
              }}
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
        />
        {data?.pagination.totalPages && data?.pagination.totalPages > 1 && (
          <DecksPagination
            totalPages={data?.pagination?.totalPages ?? 0}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
            setItemsPerPage={setPerPage}
          />
        )}
      </section>
    </>
  )
}
