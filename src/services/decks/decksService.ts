import {
  CreateParamsType,
  DeckType,
  GetDecksResponseType,
  GetParamsType,
  baseApi,
} from '@/services'
import { addFieldToFormData } from '@/utils'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<GetDecksResponseType, GetParamsType>({
        query: params => {
          return {
            url: `v1/decks`,
            params,
          }
        },
        providesTags: ['Decks'],
      }),
      getDeck: builder.query<DeckType, { id: string }>({
        query: body => {
          return {
            url: `v1/decks/${body.id}`,
          }
        },
      }),
      createDeck: builder.mutation<DeckType, CreateParamsType>({
        query: body => {
          const formData = addFieldToFormData([
            { name: 'name', value: body.name },
            { name: 'cover', value: body.cover },
            { name: 'isPrivate', value: body.isPrivate },
          ])

          return {
            method: 'POST',
            url: 'v1/decks',
            body: formData,
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<Omit<DeckType, 'author'>, string>({
        query: id => {
          return {
            method: 'DELETE',
            url: `v1/decks/${id}`,
          }
        },
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<DeckType, CreateParamsType & { id: string }>({
        query: body => {
          const formData = addFieldToFormData([
            { name: 'name', value: body.name },
            { name: 'cover', value: body.cover, checkIsUndefined: true },
            // { name: 'cover', value: prepareField(body.cover) },
            { name: 'isPrivate', value: body.isPrivate },
          ])

          return {
            method: 'PATCH',
            url: `v1/decks/${body.id}`,
            body: formData,
          }
        },
        invalidatesTags: ['Decks'],
        // invalidatesTags: (res, error, deck) => [{ type: 'Decks', id: deck.id }],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useLazyGetDeckQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
  useGetDeckQuery,
} = DecksService
