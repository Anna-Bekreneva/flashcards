import { CardType } from '@/services/cards'

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

export type GetDecksParamsType = {
  minCardsCount: number
  maxCardsCount: number
  name: string
  authorId: string
  currentPage: number
  itemsPerPage: number
  orderBy?: string
}

export type CreateDeckParamsType = {
  cover: File | undefined
  name: string
  isPrivate: boolean
}

export type GetCardParamsType = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: string
  itemsPerPage?: string
}

export type GetCardsResponseType = {
  items: CardType[]
  pagination: PaginationType
}

export type CreateCardParamsType = {
  id: string
  question: string
  answer: string
  answerImg?: File | undefined
  questionImg?: File | undefined
  questionVideo?: File | undefined
  answerVideo?: File | undefined
}
