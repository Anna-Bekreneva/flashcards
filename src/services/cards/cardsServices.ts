import { CardType, CardSmallType } from '@/services'
import { baseApi } from '@/services/baseApi.ts'
import { addFieldWIthFormData } from '@/utils'

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
      updateCard: builder.mutation<CardType, CardSmallType>({
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
            url: `v1/cards/${body.id}`,
            method: 'PATCH',
            body: formData,
          }
        },
        invalidatesTags: (res, error, card) => [{ type: 'Cards', id: card.id }],
      }),
    }
  },
})

export const { useDeleteCardMutation, useUpdateCardMutation } = CardsServices
