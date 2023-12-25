import { useState } from 'react'

import { NavLink, useNavigate, useParams } from 'react-router-dom'

import video from '../../assets/video.mp4'

import s from './deckPage.module.scss'

import { DeleteIcon, EditIcon, PlayIcon, StarIcon } from '@/assets/iconsComponents'
import {
  AddCardModal,
  Column,
  DecksHeader,
  DropDownMenu,
  Sort,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TextField,
} from '@/components'
import { Preloader } from '@/components/ui/preloader'
import { ProgressBar } from '@/components/ui/progressBar'
import { MY_ID } from '@/pages'
import { useGetCardsQuery, useGetDeckQuery } from '@/services'
import { calcRating, getDate } from '@/utils'

export const DeckPage = () => {
  // заменить на deckId
  const { id } = useParams()
  const { data } = useGetDeckQuery({ id: id ?? '' })
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  // const [id]
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<Sort>(null)
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  const columns: Array<Column> = [
    { key: 'question', title: 'Question' },
    { key: 'answer', title: 'Answer' },
    { key: 'update', title: 'Last Updated', sortable: true },
    { key: 'grade', title: 'Grade' },
    { key: 'buttons', title: '' },
  ]

  const { data: cards, isLoading, isFetching } = useGetCardsQuery({ id: id || '' })

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {isFetching && <ProgressBar />}
      <section className={'container section'}>
        <AddCardModal
          deckId={id ?? ''}
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
        >
          {data?.userId === MY_ID ? <DeckPageHeaderDropDown id={data.userId} /> : null}
        </DecksHeader>
        <TextField
          className={s.search}
          type={'search'}
          placeholder={'Input search'}
          value={search}
          onValueChange={value => setSearch(value)}
        />

        <Table>
          <TableHeader columns={columns} sort={sort} onSort={setSort} />
          <TableBody>
            {cards &&
              cards.items.map(card => {
                return (
                  <TableRow key={card.id}>
                    <TableCell>
                      <div className={s.cardInfo}>
                        {card.questionImg && (
                          <div className={s.preview}>
                            <img
                              className={s.image}
                              src={card.questionImg}
                              alt={'Preview'}
                              width={118}
                              height={48}
                              loading={'lazy'}
                            />
                            <span>{card.question} </span>
                          </div>
                        )}

                        {card.questionVideo && (
                          <div className={s.preview}>
                            <video
                              className={s.video}
                              src={video}
                              width={118}
                              height={48}
                              controls
                              muted
                            />
                            <span>{card.question} </span>
                          </div>
                        )}
                      </div>
                      {!card.questionImg && !card.questionVideo && <span>{card.question}</span>}
                    </TableCell>
                    <TableCell>
                      <div className={s.cardInfo}>
                        {card.answerImg && (
                          <div className={s.preview}>
                            <img
                              className={s.image}
                              src={card.answerImg}
                              alt={'Preview'}
                              width={118}
                              height={48}
                              loading={'lazy'}
                            />
                            <span>{card.answer} </span>
                          </div>
                        )}

                        {card.answerVideo && (
                          <div className={s.preview}>
                            <video
                              className={s.video}
                              src={video}
                              width={118}
                              height={48}
                              controls
                              muted
                            />
                            <span>{card.answer} </span>
                          </div>
                        )}
                      </div>
                      {!card.answerImg && !card.answerVideo && <span>{card.answer}</span>}
                    </TableCell>
                    <TableCell>{getDate(card.updated)}</TableCell>
                    <TableCell>
                      <span className={'sr-only'}> Rating {card.grade} out of 5 </span>
                      <ul className={s.ratings} aria-hidden>
                        {calcRating(card.grade).map((item, index) => {
                          return (
                            <li key={index} className={s.rating}>
                              {item === 'fill' ? (
                                <StarIcon fill="#E6AC39" />
                              ) : (
                                <StarIcon stroke="#E6AC39" />
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </TableCell>
                    {card.userId === MY_ID ? (
                      <TableCell>
                        <div className={s.manage}>
                          <button className={s.button} type="button" aria-label={'Edit card'}>
                            <EditIcon />
                          </button>
                          <button className={s.button} type="button" aria-label={'Delete card'}>
                            <DeleteIcon />
                          </button>
                        </div>
                      </TableCell>
                    ) : null}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
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
