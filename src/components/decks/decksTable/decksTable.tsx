import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import notFoundImg from '../../../assets/images/not-found.png'

import s from './decksTable.module.scss'

import { DeleteIcon, EditIcon, PlayIcon } from '@/assets/iconsComponents'
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
import { DeckType } from '@/services'
import { getDate } from '@/utils'

type Props = {
  id: string
  items: DeckType[] | undefined
  setIdUpdateDeck: (id: string) => void
  setIdDeleteDeck: (id: string) => void
  sort: Sort
  setSort: (value: Sort) => void
  disabled?: boolean
}
export const DecksTable: FC<Props> = ({
  id,
  items,
  setIdUpdateDeck,
  setIdDeleteDeck,
  sort,
  setSort,
  disabled,
}) => {
  const columns: Array<Column> = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'cardsCount',
      title: 'Cards',
    },
    {
      key: 'updated',
      title: 'Last Updated',
      sortable: true,
    },
    {
      key: 'createdBy',
      title: 'Created by',
    },
    {
      key: 'buttons',
      title: '',
    },
  ]

  return (
    <>
      {items?.length ? (
        <Table className={s.table}>
          <TableHeader sort={sort} onSort={setSort} columns={columns} />
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <NavLink className={s.deck} to={`decks/deck/${item.id}`}>
                    {item.cover ? (
                      <div className={s.preview}>
                        <img className={s.image} src={item.cover} alt={'Preview'} />
                        <span>{item.name}</span>
                      </div>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </NavLink>
                </TableCell>
                <TableCell>{item.cardsCount}</TableCell>
                <TableCell>{getDate(item.updated)}</TableCell>
                <TableCell>{item.author.name}</TableCell>
                <TableCell>
                  <NavLink
                    className={s.button}
                    to={`decks/deck/cards/${item.id}`}
                    aria-label={'Learn deck'}
                  >
                    <PlayIcon />
                  </NavLink>
                  {item.author.id === id ? (
                    <>
                      <button
                        className={s.button}
                        onClick={() => setIdUpdateDeck(item.id)}
                        type="button"
                        aria-label={'Edit deck'}
                        disabled={disabled}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className={s.button}
                        onClick={() => setIdDeleteDeck(item.id)}
                        type="button"
                        aria-label={'Delete deck'}
                        disabled={disabled}
                      >
                        <DeleteIcon />
                      </button>
                    </>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
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
