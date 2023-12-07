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
      getDeck: builder.query<any, void>({
        query: () => {
          return {
            url: `v1/decks`,
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
          return {
            method: 'PATCH',
            url: `v1/decks/${body.id}`,
            body: { name: body.name, isPrivate: body.isPrivate, cover: body.cover },
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} = DecksService
