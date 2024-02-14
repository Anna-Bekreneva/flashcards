import { useState } from 'react'

import s from './cardsTable.module.scss'

import { DeleteIcon, EditIcon } from '@/assets/iconsComponents'
import { StarIcon } from '@/assets/iconsComponents/star.tsx'
import { Column, Sort, Table, TableBody, TableCell, TableHeader, TableRow } from '@/components'
import { MY_ID } from '@/pages'
import { CardsResponseType } from '@/services/cards'
import { getDate } from '@/utils'

const columns: Column[] = [
  { key: 'question', title: 'Question' },
  { key: 'answer', title: 'Answer' },
  { key: 'updated', title: 'Last Updated', sortable: true },
  { key: 'grade', title: 'Grade' },
  { key: 'buttons', title: '' },
]

type Props = {
  cards: CardsResponseType[] | undefined
  sort: Sort
  setSort: (sort: Sort) => void
  deleteCard: (id: string) => void
  editCard: (id: string) => void
  disabled?: boolean
}

export const CardsTable = ({ cards, editCard, deleteCard, disabled, sort, setSort }: Props) => {
  const getStars = (card: CardsResponseType) => {
    const stars = []

    for (let i = 0; i < 5; i++) {
      if (i < card.grade) {
        stars.push(<StarIcon fill={'#E6AC39'} key={i} />)
      } else {
        stars.push(<StarIcon stroke={'#E6AC39'} key={i} />)
      }
    }

    return stars
  }

  return (
    <>
      <Table className={s.table}>
        <TableHeader columns={columns} sort={sort} onSort={setSort} />
        <TableBody>
          {cards?.map(card => {
            return (
              <TableRow key={card.id}>
                <TableCell>
                  <QuestionAnswerRepresentation
                    text={card.question}
                    img={card.questionImg}
                    video={card.questionVideo}
                    isQuestion={true}
                  />
                </TableCell>
                <TableCell>
                  <QuestionAnswerRepresentation
                    text={card.answer}
                    img={card.answerImg}
                    video={card.answerVideo}
                    isQuestion={false}
                  />
                </TableCell>
                <TableCell>{getDate(card.updated)}</TableCell>
                <TableCell>{getStars(card)}</TableCell>
                {card.userId === MY_ID && (
                  <TableCell>
                    <div className={s.manage}>
                      <button
                        className={s.btn}
                        onClick={() => editCard(card.id)}
                        aria-label={'Edit card'}
                        disabled={disabled}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className={s.btn}
                        onClick={() => deleteCard(card.id)}
                        aria-label={'Delete card'}
                        disabled={disabled}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

type RepresentProps = {
  text: string | null
  img: string | null
  video: string | null
  isQuestion: boolean
}
const QuestionAnswerRepresentation = ({ text, img, video, isQuestion }: RepresentProps) => {
  return (
    <>
      {video && (
        <div className={s.preview}>
          <video className={s.video} src={video} width={118} height={48} controls muted />
          <TextRepresentation text={text || ''} />
        </div>
      )}
      {img && !video && (
        <div className={s.preview}>
          <img
            className={s.image}
            src={img}
            alt={isQuestion ? 'Question preview' : 'Answer preview'}
            width={118}
            height={48}
            loading={'lazy'}
          />
          <TextRepresentation text={text || ''} />
        </div>
      )}
      {!video && !img && <TextRepresentation text={text || ''} />}
    </>
  )
}

type TextProps = { text: string }
const TextRepresentation = ({ text }: TextProps) => {
  const [isShowWholeText, setIsShowWholeText] = useState<boolean>(text.length <= 15)
  const isTextTooLarge = text.length >= 15
  const textStart = text.slice(0, 15)

  if (!isTextTooLarge) {
    return <p>{text}</p>
  } else {
    return (
      <p>
        {isShowWholeText ? (
          <>
            {text}{' '}
            <button className={s.linkBtn} onClick={() => setIsShowWholeText(!isShowWholeText)}>
              Hide
            </button>
          </>
        ) : (
          <>
            {textStart}...
            <button className={s.linkBtn} onClick={() => setIsShowWholeText(!isShowWholeText)}>
              More
            </button>
          </>
        )}
      </p>
    )
  }
}
