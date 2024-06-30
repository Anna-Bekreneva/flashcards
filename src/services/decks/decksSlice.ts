import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DecksTabsVariant, DecksTabsVariantType } from '@/common'
import { Sort } from '@/components'

export const decksSlice = createSlice({
  initialState: {
    currentPage: 1,
    itemsPerPage: 10,
    maxCardsCount: undefined as number | undefined,
    minCardsCount: 0,
    name: '',
    sort: null as Sort,
    tabDecksValue: DecksTabsVariant.allCards as DecksTabsVariantType,
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
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload
    },
    setTabDecksValue: (state, action: PayloadAction<DecksTabsVariantType>) => {
      state.tabDecksValue = action.payload
    },
    resetSettings: state => {
      state.name = ''
      state.tabDecksValue = DecksTabsVariant.allCards
      state.minCardsCount = 0
    },
  },
})

export const decksActions = decksSlice.actions
