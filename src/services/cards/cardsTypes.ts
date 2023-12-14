type CardRatingType = 1 | 2 | 3 | 4 | 5

export type CardsResponseType = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: CardRatingType
  created: string
  updated: string
}

export type CardRequestCommonType = {
  questionImg?: string
  answerImg?: string
  question: string
  answer: string
  questionVideo?: string
  answerVideo?: string
}

export type UpdateCardRequestType = Partial<CardRequestCommonType> & { id: string }

export type CreateCardRequestType = CardRequestCommonType & { deckId: string }

export type GetCardsFromSpecificDeckRequestType = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: string
  itemsPerPage?: number
}

export type GetCardsFromSpecificDeckResponseType = {
  items: ItemsType[]
  pagination: PaginationType
}
export type ItemsType = Omit<CardsResponseType, 'rating'>
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
  cardId: string
  grade: CardRatingType
}
