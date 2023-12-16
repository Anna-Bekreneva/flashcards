import { useState } from 'react'

import { NavLink, useNavigate, useParams } from 'react-router-dom'

import s from './deckPage.module.scss'

import { DeleteIcon, EditIcon, PlayIcon } from '@/assets/iconsComponents'
import { DecksHeader, DropDownMenu, TextField } from '@/components'
import { Preloader } from '@/components/ui/preloader'
import { ProgressBar } from '@/components/ui/progressBar'
import { useGetDeckQuery } from '@/services'

export const DeckPage = () => {
  const { id } = useParams()
  const { data, isLoading, isFetching } = useGetDeckQuery({ id: id ?? '' })
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [search, setSearch] = useState('')

  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {isFetching && <ProgressBar />}
      <section className={'container section'}>
        <button className={'back'} onClick={goBack}>
          Back to Packs List
        </button>
        <DecksHeader
          className={s.header}
          isOpenAddModal={isOpenAddModal}
          setIsOpenAddModal={setIsOpenAddModal}
          count={data?.cardsCount}
          title={data?.name}
          buttonText={'Add new card'}
          cover={data?.cover}
          to={'Learn pack'}
        >
          <DeckPageHeaderDropDown id={data?.id ?? ''} />
        </DecksHeader>
        <TextField
          className={s.search}
          type={'search'}
          placeholder={'Input search'}
          value={search}
          onValueChange={value => setSearch(value)}
        />
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
