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
  minCardsCount: number
  maxCardsCount: number
  name: string
  authorId: string
  currentPage: number
  itemsPerPage: number
  orderBy?: string
}

export type CreateParamsType = {
  cover: File | undefined
  name: string
  isPrivate: boolean
}

export type CardParamsType = {
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

export type CardType = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  grade: number
  answerImg: string | null
  questionImg: string | null
  questionVideo: string | null
  answerVideo: string | null
  created: string
  updated: string
}
