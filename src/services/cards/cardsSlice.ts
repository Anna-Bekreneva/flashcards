import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/components'

export const cardsSlice = createSlice({
  initialState: {
    currentPage: 1,
    itemsPerPage: 10,
    previousCardId: '',
    search: '',
    sort: null as Sort,
  },
  name: 'cards',
  reducers: {
    resetCurrentPage: state => {
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setPreviousCardId: (state, action: PayloadAction<string>) => {
      state.previousCardId = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload
    },
  },
})
