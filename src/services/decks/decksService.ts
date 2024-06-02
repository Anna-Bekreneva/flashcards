import { errorServerHandler } from '@/common'
import {
  baseApi,
  CreateDeckParamsType,
  DeckType,
  GetDecksParamsType,
  GetDecksResponseType,
} from '@/services'
import { addFieldToFormData } from '@/utils'

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
            ? [...res.items.map(deck => ({ type: 'Decks' as const, id: deck.id })), 'Decks']
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

        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          try {
            const res = await queryFulfilled

            for (const { endpointName, originalArgs } of DecksService.util.selectInvalidatedBy(
              getState(),
              [{ type: 'Decks' }]
            )) {
              if (endpointName !== 'getDecks') {
                continue
              }
              dispatch(
                DecksService.util.updateQueryData(endpointName, originalArgs, draft => {
                  draft.items.unshift(res.data)
                })
              )
            }
          } catch (error) {
            errorServerHandler(error)
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
        async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
          for (const { endpointName, originalArgs } of DecksService.util.selectInvalidatedBy(
            getState(),
            [{ type: 'Decks' }]
          )) {
            if (endpointName !== 'getDecks') {
              continue
            }

            const patchResult = dispatch(
              DecksService.util.updateQueryData(endpointName, originalArgs, draft => {
                const index = draft.items.findIndex(item => item.id === id)

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

        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<DeckType, CreateDeckParamsType & { id: string }>({
        query: body => {
          const formData = addFieldToFormData([
            { name: 'name', value: body.name },
            { name: 'cover', value: body.cover },
            { name: 'isPrivate', value: body.isPrivate },
          ])

          return {
            method: 'PATCH',
            url: `v1/decks/${body.id}`,
            body: formData,
          }
        },
        async onQueryStarted(params, { dispatch, getState, queryFulfilled }) {
          try {
            const res = await queryFulfilled

            for (const { endpointName, originalArgs } of DecksService.util.selectInvalidatedBy(
              getState(),
              [{ type: 'Decks' }]
            )) {
              if (endpointName !== 'getDecks') {
                continue
              }
              dispatch(
                DecksService.util.updateQueryData(endpointName, originalArgs, draft => {
                  const id = params.id
                  const index = draft.items.findIndex(item => item.id === id)

                  if (index !== -1) {
                    draft.items[index] = { ...res.data }
                  }
                })
              )
            }
          } catch (error) {
            errorServerHandler(error)
          }
        },
        invalidatesTags: (_res, _error, deck) => [{ type: 'Decks', id: deck.id }],
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
