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

export type GetLearnCardParamsType = {
  id: string
  previousCardId?: string
}

export type SaveGradeParamsType = {
  id: string
  cardId: string
  grade: number
}
