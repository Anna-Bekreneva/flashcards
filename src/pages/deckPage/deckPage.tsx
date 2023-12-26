import { useState } from 'react'

import { NavLink, useNavigate, useParams } from 'react-router-dom'

import s from './deckPage.module.scss'

import { DeleteIcon, EditIcon, PlayIcon } from '@/assets/iconsComponents'
import { TypographyVariant } from '@/common'
import {
  AddCardModal,
  Button,
  CardsTable,
  DecksHeader,
  DropDownMenu,
  NotFound,
  TextField,
  Typography,
} from '@/components'
import { Preloader } from '@/components/ui/preloader'
import { ProgressBar } from '@/components/ui/progressBar'
import { MY_ID } from '@/pages'
import { useGetCardsQuery, useGetDeckQuery } from '@/services'

export const DeckPage = () => {
  const { id: deckId } = useParams()
  const { data } = useGetDeckQuery({ id: deckId ?? '' })
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  const { data: cards, isLoading, isFetching } = useGetCardsQuery({ id: deckId || '' })

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {isFetching && <ProgressBar />}
      <section className={'container section'}>
        <AddCardModal
          key={deckId}
          deckId={deckId ?? ''}
          isOpen={isOpenAddModal}
          onOpenChange={() => setIsOpenAddModal(!isOpenAddModal)}
        />
        <button className={'back'} onClick={goBack}>
          Back to Packs List
        </button>
        <DecksHeader
          className={s.header}
          isOpenAddModal={isOpenAddModal}
          setIsOpenAddModal={setIsOpenAddModal}
          count={data?.cardsCount}
          title={data?.name}
          buttonText={data?.userId === MY_ID ? 'Add new Card' : 'Learn to Pack'}
          cover={data?.cover}
          to={data?.userId === MY_ID ? '' : 'Learn to Pack'}
          isShowButton={!!cards?.items.length}
        >
          {cards?.items.length && data?.userId === MY_ID ? (
            <DeckPageHeaderDropDown id={data.userId} />
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

        {!cards?.items.length && data?.userId === MY_ID ? (
          <NotFound className={s.notFound}>
            <Typography variant={TypographyVariant.body1}>
              This pack is empty. Click add new card to fill this pack
            </Typography>
            <Button onClick={() => setIsOpenAddModal(true)} type={'button'}>
              Add New Card
            </Button>
          </NotFound>
        ) : (
          <CardsTable cards={cards?.items} />
        )}
      </section>
    </>
  )
}

const DeckPageHeaderDropDown = (props: { id: string }) => {
  return (
    <DropDownMenu
      className={s.dropdown}
      trigger={<button className={s.trigger} aria-label={'manage deck'} />}
    >
      <ul>
        <li className={s.dropdownItem}>
          <NavLink className={s.dropdownAction} to={`/decks/deck/cards/${props.id}`}>
            <PlayIcon width={16} height={16} /> Learn
          </NavLink>
        </li>
        <li className={s.dropdownItem}>
          <button className={s.dropdownAction} type={'button'}>
            <EditIcon width={16} height={16} /> Edit
          </button>
        </li>
        <li className={s.dropdownItem}>
          <button className={s.dropdownAction} type={'button'}>
            <DeleteIcon width={16} height={16} /> Delete
          </button>
        </li>
      </ul>
    </DropDownMenu>
  )
}
