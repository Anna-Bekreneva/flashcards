export type CardRatingType = 1 | 2 | 3 | 4 | 5

export type CardsResponseType = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string | null
  questionImg: string | null
  questionVideo: string | null
  answerVideo: string | null
  grade: CardRatingType
  created: string
  updated: string
}

export type CardRequestCommonType = {
  questionImg?: string | File
  answerImg?: string | File
  question: string
  answer: string
  questionVideo?: string | File
  answerVideo?: string | File
}

export type UpdateCardRequestType = Partial<CardRequestCommonType> & { id: string }

export type CreateCardRequestType = CardRequestCommonType & { id: string }

export type GetCardsRequestType = {
  id: string
  question?: string
  answer?: string
  orderBy?: string | null
  currentPage?: number
  itemsPerPage?: number
}

export type GetCardsResponseType = {
  items: CardsResponseType[]
  pagination: PaginationType
}

export type PaginationType = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export type GetRandomCardRequestType = {
  id: string
  previousCardId?: string
}

export type SaveGradeOfCardType = {
  deckId: string
  cardId: string
  grade: CardRatingType
}
