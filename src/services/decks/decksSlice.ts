import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SortDirectionType } from '@/components'

export const decksSlice = createSlice({
  initialState: {
    authorId: '' as string | undefined,
    currentPage: 1,
    itemsPerPage: 10,
    maxCardsCount: undefined as number | undefined,
    minCardsCount: undefined as number | undefined,
    name: '',
    orderBy: null as SortDirectionType | null,
  },
  name: 'decks',
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setMaxCardsCount: (state, action: PayloadAction<number>) => {
      state.maxCardsCount = action.payload
    },
    setMinCardsCount: (state, action: PayloadAction<number>) => {
      state.minCardsCount = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})
