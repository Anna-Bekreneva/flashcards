import {
  CreateDeckParamsType,
  DeckType,
  GetDecksResponseType,
  GetParamsType,
  baseApi,
  RootState,
  decksSlice,
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
        // onQueryStarted: async (_, { dispatch, queryFulfilled, getState }) => {
        //   const result = await queryFulfilled
        //
        //   const state = getState() as RootState
        //   const { name, currentPage, itemsPerPage, maxCardsCount, minCardsCount, authorId } =
        //     state.decks
        //
        //   console.log(result)
        //
        //   dispatch(
        //     DecksService.util.updateQueryData(
        //       'getDecks',
        //       {
        //         itemsPerPage,
        //         currentPage,
        //         name,
        //         minCardsCount,
        //         maxCardsCount,
        //         authorId,
        //       },
        //       draft => {
        //         console.log('sssssssssssssssssssssssssssss')
        //         draft.items.unshift(result.data)
        //       }
        //     )
        //   )
        // },

        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
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
        // onQueryStarted: async (id, { dispatch, queryFulfilled, getState }) => {
        //   const state = getState() as RootState
        //   const { name, currentPage, itemsPerPage, maxCardsCount, minCardsCount, authorId } =
        //     state.decks
        //
        //   dispatch(
        //     DecksService.util.updateQueryData(
        //       'getDecks',
        //       {
        //         itemsPerPage,
        //         currentPage,
        //         name,
        //         minCardsCount,
        //         maxCardsCount,
        //         authorId,
        //       },
        //       draft => {
        //         const index = draft.items.findIndex(item => item.id === id)
        //
        //         draft.items.splice(index, 1)
        //       }
        //     )
        //   )
        //   try {
        //     const result = await queryFulfilled
        //   }
        // },
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
