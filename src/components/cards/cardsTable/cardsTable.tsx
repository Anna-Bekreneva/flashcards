import { FC, useState } from 'react'

import notFoundImg from '../../../assets/images/not-found.png'

import s from './cardsTable.module.scss'

import { DeleteIcon, EditIcon, StarIcon } from '@/assets/iconsComponents'
import { TypographyVariant } from '@/common'
import {
  Column,
  NotFound,
  Sort,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
} from '@/components'
import { MY_ID } from '@/pages'
import { CardType } from '@/services'
import { calcRating, getDate } from '@/utils'

type Props = {
  cards: CardType[] | undefined
}

export const CardsTable: FC<Props> = ({ cards }) => {
  const [sort, setSort] = useState<Sort>(null)
  const columns: Array<Column> = [
    { key: 'question', title: 'Question' },
    { key: 'answer', title: 'Answer' },
    { key: 'update', title: 'Last Updated', sortable: true },
    { key: 'grade', title: 'Grade' },
    { key: 'buttons', title: '' },
  ]

  return (
    <>
      {cards?.length ? (
        <Table>
          <TableHeader columns={columns} sort={sort} onSort={setSort} />
          <TableBody>
            {cards.map(card => {
              return (
                <TableRow key={card.id}>
                  <TableCell>
                    <Preview
                      video={card.questionVideo}
                      text={card.question}
                      img={card.questionImg}
                    />
                  </TableCell>
                  <TableCell>
                    <Preview video={card.answerVideo} text={card.answer} img={card.answerImg} />
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
      ) : (
        <NotFound className={s.notFound}>
          <img src={notFoundImg} alt="Not found" width={400} height={200} />
          <Typography variant={TypographyVariant.h3}> Decks not found </Typography>
        </NotFound>
      )}
    </>
  )
}

type PreviewProps = {
  text: string | null
  img: string | null
  video: string | null
}

const Preview: FC<PreviewProps> = ({ text, img, video }) => {
  return (
    <>
      {video && (
        <div className={s.preview}>
          <video className={s.video} src={video} width={118} height={48} controls muted />
          <p>{text} </p>
        </div>
      )}

      {img && !video && (
        <div className={s.preview}>
          <img
            className={s.image}
            src={img}
            alt={'Preview'}
            width={118}
            height={48}
            loading={'lazy'}
          />
          <p>{text} </p>
        </div>
      )}
      {!img && !video && <p>{text}</p>}
    </>
  )
}
