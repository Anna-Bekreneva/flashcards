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
          return {
            method: 'POST',
            url: `/v1/decks/${card.deckId}/cards`,
            body: {
              card,
            },
          }
        },
        invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation<CardsResponseType, UpdateCardRequestType>({
        query: card => {
          return {
            method: 'PATCH',
            url: `/v1/cards/${card.id}`,
            body: {
              card,
            },
          }
        },
        invalidatesTags: (res, error, card) => [{ type: 'Cards', id: card.id }],
      }),
      deleteCard: builder.mutation<void, string>({
        query: id => {
          return {
            method: 'DELETE',
            url: `/v1/cards/${id}`,
          }
        },
        invalidatesTags: ['Cards'],
      }),
      getRandomCard: builder.query<CardsResponseType, GetRandomCardRequestType>({
        query: params => {
          return {
            url: `/v1/decks/${params.id}/learn`,
            params,
          }
        },
      }),
      saveGradeOfCard: builder.mutation<{}, SaveGradeOfCardType>({
        query: params => {
          return {
            method: 'POST',
            url: `/v1/decks/${params.id}/learn`,
            body: params,
          }
        },
        invalidatesTags: (res, error, card) => [{ type: 'Cards', id: card.id }],
      }),
    }
  },
})

export const {
  useGetCardsQuery,
  useGetCardByIdQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
  useCreateCardMutation,
  useGetRandomCardQuery,
  useSaveGradeOfCardMutation,
} = CardsService
