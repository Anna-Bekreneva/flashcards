import { baseApi } from '@/services/baseApi.ts'

export const CardsServices = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCard: builder.mutation<void, { id: string }>({
        query: body => {
          return {
            url: `v1/cards/${body.id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const { useDeleteCardMutation } = CardsServices
