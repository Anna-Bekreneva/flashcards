import { errorServerHandler } from '@/common'
import {
  baseApi,
  CardsResponseType,
  CreateCardRequestType,
  GetCardsRequestType,
  GetCardsResponseType,
  GetRandomCardRequestType,
  SaveGradeOfCardType,
  UpdateCardRequestType,
} from '@/services'
import { addFieldToFormData } from '@/utils'

export const CardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<GetCardsResponseType, GetCardsRequestType>({
        query: ({ id, ...params }) => {
          return {
            url: `/v1/decks/${id}/cards`,
            params,
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
      createCard: builder.mutation<CardsResponseType, CreateCardRequestType>({
        query: card => {
          const formData = addFieldToFormData([
            { name: 'question', value: card.question },
            { name: 'answer', value: card.answer },
            { name: 'questionImg', value: card.questionImg },
            { name: 'answerImg', value: card.answerImg },
          ])

          return {
            method: 'POST',
            url: `/v1/decks/${card.id}/cards`,
            body: formData,
          }
        },
        onQueryStarted: async (_, { dispatch, getState, queryFulfilled }) => {
          try {
            const result = await queryFulfilled

            for (const { endpointName, originalArgs } of CardsService.util.selectInvalidatedBy(
              getState(),
              [{ type: 'Cards' }]
            )) {
              if (endpointName !== 'getCards') {
                continue
              }
              dispatch(
                CardsService.util.updateQueryData(endpointName, originalArgs, draft => {
                  draft.items.unshift(result.data)
                })
              )
            }
          } catch (error) {
            errorServerHandler(error)
          }
        },
        invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation<CardsResponseType, UpdateCardRequestType>({
        query: card => {
          const formData = addFieldToFormData([
            { name: 'question', value: card.question },
            { name: 'answer', value: card.answer },
            { name: 'questionImg', value: card.questionImg },
            { name: 'answerImg', value: card.answerImg },
          ])

          return {
            method: 'PATCH',
            url: `/v1/cards/${card.id}`,
            body: formData,
          }
        },
        async onQueryStarted(params, { dispatch, getState, queryFulfilled }) {
          for (const { endpointName, originalArgs } of CardsService.util.selectInvalidatedBy(
            getState(),
            [{ type: 'Cards' }]
          )) {
            if (endpointName !== 'getCards') {
              continue
            }
            const patchResult = dispatch(
              CardsService.util.updateQueryData(endpointName, originalArgs, draft => {
                const index = draft.items.findIndex(item => item.id === params.id)

                if (index !== -1) {
                  draft.items[index] = { ...draft.items[index], ...params } as CardsResponseType
                }
              })
            )

            try {
              await queryFulfilled
            } catch (error) {
              errorServerHandler(error)
              patchResult.undo()
            }
          }
        },
        invalidatesTags: (_res, _error, card) => [{ type: 'Cards', id: card.id }],
      }),
      deleteCard: builder.mutation<void, { id: string }>({
        query: body => {
          return {
            method: 'DELETE',
            url: `/v1/cards/${body.id}`,
          }
        },
        async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
          for (const { endpointName, originalArgs } of CardsService.util.selectInvalidatedBy(
            getState(),
            [{ type: 'Cards' }]
          )) {
            if (endpointName !== 'getCards') {
              continue
            }
            const patchResult = dispatch(
              CardsService.util.updateQueryData(endpointName, originalArgs, draft => {
                const index = draft.items.findIndex(card => card.id === args.id)

                draft.items.splice(index, 1)
              })
            )

            try {
              await queryFulfilled
            } catch (error) {
              errorServerHandler(error)
              patchResult.undo()
            }
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
      saveGradeOfCard: builder.mutation<CardsResponseType, SaveGradeOfCardType>({
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
        invalidatesTags: (_res, _error, card) => [{ type: 'Cards', id: card.cardId }],
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
