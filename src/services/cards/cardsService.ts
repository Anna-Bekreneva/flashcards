import { baseApi } from '@/services/baseApi.ts'
import {
  CardsResponseType,
  CreateCardRequestType,
  GetCardsFromSpecificDeckRequestType,
  GetCardsFromSpecificDeckResponseType,
  GetRandomCardRequestType,
  SaveGradeOfCardType,
  UpdateCardRequestType,
} from '@/services/cards/cardsTypes.ts'

export const CardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsResponseType[], string>({
        query: id => {
          return {
            url: `/v1/cards/${id}`,
          }
        },
        providesTags: ['Cards'],
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
        invalidatesTags: ['Cards'], //fix
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
      getCardsFromSpecificDeck: builder.query<
        GetCardsFromSpecificDeckResponseType,
        GetCardsFromSpecificDeckRequestType
      >({
        query: params => {
          return {
            url: `/v1/decks/${params.id}/cards`,
            params,
          }
        },
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
            url: `/v1/decks/${params.cardId}/learn`,
            body: params,
          }
        },
        invalidatesTags: ['Cards'], //fix!!! (id)
      }),
    }
  },
})

export const {
  useGetCardsQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
  useCreateCardMutation,
  useGetCardsFromSpecificDeckQuery,
  useGetRandomCardQuery,
  useSaveGradeOfCardMutation,
} = CardsService
