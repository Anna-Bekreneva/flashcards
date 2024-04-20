import { CoverType } from '@/components'

export type GetDecksResponseType = {
  items: DeckType[]
  pagination: PaginationType
  maxCardsCount: number
}

type AuthorType = {
  id: string
  name: string
}

export type DeckType = {
  author: AuthorType
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  created: string
  updated: string
  cardsCount: number
}

type PaginationType = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export type GetParamsType = {
  minCardsCount: number | undefined
  maxCardsCount: number | undefined
  name: string
  authorId: string | undefined
  currentPage: number
  itemsPerPage: number
  orderBy?: string | null
}

export type CreateDeckParamsType = {
  cover: CoverType
  name: string
  isPrivate: boolean
}
