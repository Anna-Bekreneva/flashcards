import s from './cardsTable.module.scss'

import { DeleteIcon, EditIcon } from '@/assets/iconsComponents'
import { StarIcon } from '@/assets/iconsComponents/star.tsx'
import {
  CellRepresentation,
  Column,
  Sort,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components'
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
                <TableCell className={s.representation}>
                  <CellRepresentation text={card.question} img={card.questionImg} />
                </TableCell>
                <TableCell className={s.representation}>
                  <CellRepresentation text={card.answer} img={card.answerImg} />
                </TableCell>
                <TableCell>{getDate(card.updated)}</TableCell>
                <TableCell className={s.cellRating}>{getStars(card)}</TableCell>
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
