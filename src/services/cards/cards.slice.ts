import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const cardsSlice = createSlice({
  initialState: {
    question: undefined as string | undefined,
    answer: undefined as string | undefined,
    orderBy: undefined as string | null | undefined,
    currentPage: 1 as number | undefined,
    itemsPerPage: 10 as number | undefined,
  },
  name: 'cardsSlice',
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
    setQuestion: (state, action: PayloadAction<string>) => {
      state.question = action.payload
    },
    setAnswer: (state, action: PayloadAction<string>) => {
      state.answer = action.payload
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload
    },
  },
})
