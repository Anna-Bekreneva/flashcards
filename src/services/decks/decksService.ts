import { CreateParamsType, DeckType, GetDecksResponseType, GetParamsType } from '@/services'
import { baseApi } from '@/services/baseApi.ts'

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
          const formData = new FormData()

          formData.append('name', body.name)
          body.cover && formData.append('cover', body.cover)
          formData.append('isPrivate', body.isPrivate.toString())

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
          const formData = new FormData()

          body.cover && formData.append('cover', body.cover)
          formData.append('name', body.name)
          body.isPrivate && formData.append('isPrivate', body.isPrivate.toString())

          return {
            method: 'PATCH',
            url: `v1/decks/${body.id}`,
            body: formData,
          }
        },
        invalidatesTags: ['Decks'],
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
