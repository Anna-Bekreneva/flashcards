import { baseApi } from '@/services/baseApi.ts'
import {
  CardsResponseType,
  CreateCardRequestType,
  GetCardsRequestType,
  GetCardsResponseType,
  GetRandomCardRequestType,
  SaveGradeOfCardType,
  UpdateCardRequestType,
} from '@/services/cards/cardsTypes.ts'

export const CardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<GetCardsResponseType, GetCardsRequestType>({
        query: card => {
          return {
            url: `/v1/decks/${card.id}/cards`,
            params: {
              question: card.question,
              answer: card.answer,
              orderBy: card.orderBy,
              currentPage: card.currentPage,
              itemsPerPage: card.itemsPerPage,
            },
          }
        },
        providesTags: res =>
          res
            ? [...res.items.map(card => ({ type: 'Cards' as const, id: card.id })), 'Cards']
            : ['Cards'],
      }),
      getCardById: builder.query<CardsResponseType[], string>({
        query: id => {
          return {
            url: `/v1/cards/${id}`,
          }
        },
      }),
      createCard: builder.mutation<any, CreateCardRequestType>({
        query: card => {
          const formData = new FormData()

          formData.append('question', card.question)
          formData.append('answer', card.answer)
          card.questionImg && formData.append('questionImg', card.questionImg)
          card.answerImg && formData.append('answerImg', card.answerImg)
          card.questionVideo && formData.append('questionVideo', card.questionVideo)
          card.answerVideo && formData.append('answerVideo', card.answerVideo)

          return {
            method: 'POST',
            url: `/v1/decks/${card.id}/cards`,
            body: formData,
          }
        },
        invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation<CardsResponseType, UpdateCardRequestType>({
        query: card => {
          const formData = new FormData()

          card.question && formData.append('question', card.question)
          card.answer && formData.append('answer', card.answer)
          card.questionImg && formData.append('questionImg', card.questionImg)
          card.answerImg && formData.append('answerImg', card.answerImg)
          card.questionVideo && formData.append('questionVideo', card.questionVideo)
          card.answerVideo && formData.append('answerVideo', card.answerVideo)

          return {
            method: 'PATCH',
            url: `/v1/cards/${card.id}`,
            body: formData,
          }
        },
        invalidatesTags: (res, error, card) => [{ type: 'Cards', id: card.id }],
      }),
      deleteCard: builder.mutation<void, { id: string }>({
        query: body => {
          return {
            method: 'DELETE',
            url: `/v1/cards/${body.id}`,
          }
        },
        invalidatesTags: ['Cards'],
      }),
      getRandomCard: builder.query<CardsResponseType, GetRandomCardRequestType>({
        query: params => {
          return {
            url: `/v1/decks/${params.id}/learn`,
            params: { previousCardId: params.previousCardId },
          }
        },
      }),
      saveGradeOfCard: builder.mutation<{}, SaveGradeOfCardType>({
        query: params => {
          return {
            method: 'POST',
            url: `/v1/decks/${params.deckId}/learn`,
            body: {
              cardId: params.cardId,
              grade: params.grade,
            },
          }
        },
        invalidatesTags: (res, error, card) => [{ type: 'Cards', id: card.cardId }],
      }),
    }
  },
})

export const {
  useGetCardsQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
  useCreateCardMutation,
  useGetRandomCardQuery,
  useSaveGradeOfCardMutation,
  useLazyGetRandomCardQuery,
} = CardsService
