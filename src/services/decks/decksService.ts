import {
  GetCardParamsType,
  CreateDeckParamsType,
  DeckType,
  GetCardsResponseType,
  GetDecksResponseType,
  GetDecksParamsType,
  CardSmallType,
  CardType,
} from '@/services'
import { baseApi } from '@/services/baseApi.ts'
import { addFieldWIthFormData } from '@/utils'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<GetDecksResponseType, GetDecksParamsType>({
        query: params => {
          return {
            url: `v1/decks`,
            params,
          }
        },
        providesTags: res =>
          res
            ? [...res.items.map(item => ({ type: 'Decks' as const, id: item.id })), 'Decks']
            : ['Decks'],
      }),
      getDeck: builder.query<DeckType, { id: string }>({
        query: body => {
          return {
            url: `v1/decks/${body.id}`,
          }
        },
      }),
      createDeck: builder.mutation<DeckType, CreateDeckParamsType>({
        query: body => {
          const formData = addFieldWIthFormData([
            { name: 'name', something: body.name },
            { name: 'cover', something: body.cover },
            { name: 'isPrivate', something: body.isPrivate.toString() },
          ])

          return {
            method: 'POST',
            url: 'v1/decks',
            body: formData,
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<Omit<DeckType, 'author'>, { id: string }>({
        query: body => {
          return {
            method: 'DELETE',
            url: `v1/decks/${body.id}`,
          }
        },
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<DeckType, CreateDeckParamsType & { id: string }>({
        query: body => {
          const formData = addFieldWIthFormData([
            { name: 'name', something: body.name },
            { name: 'cover', something: body.cover },
            { name: 'isPrivate', something: body.isPrivate.toString() },
          ])

          return {
            method: 'PATCH',
            url: `v1/decks/${body.id}`,
            body: formData,
          }
        },
        invalidatesTags: (res, error, deck) => [{ type: 'Decks', id: deck.id }],
      }),
      getCards: builder.query<GetCardsResponseType, GetCardParamsType>({
        query: ({ id, ...rest }) => {
          return {
            url: `v1/decks/${id}/cards`,
            params: rest,
          }
        },
        providesTags: ['Cards'],
      }),
      createCard: builder.mutation<CardType, CardSmallType>({
        query: body => {
          const formData = addFieldWIthFormData([
            { name: 'answer', something: body.answer },
            { name: 'question', something: body.question },
            { name: 'questionImg', something: body.questionImg },
            { name: 'answerImg', something: body.answerImg },
            { name: 'questionVideo', something: body.questionVideo },
            { name: 'answerVideo', something: body.answerVideo },
          ])

          return {
            method: 'POST',
            url: `v1/decks/${body.id}/cards`,
            body: formData,
          }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
  useGetDeckQuery,
  useGetCardsQuery,
  useCreateCardMutation,
} = DecksService
