import { RootState } from '@/services'

export const selectDecksCurrentPage = (state: RootState) => state.decks.currentPage
export const selectItemsPerPage = (state: RootState) => state.decks.itemsPerPage
export const selectMaxCardCount = (state: RootState) => state.decks.maxCardsCount
export const selectMinCardCount = (state: RootState) => state.decks.minCardsCount
export const selectName = (state: RootState) => state.decks.name
export const selectTabsDecksValue = (state: RootState) => state.decks.tabDecksValue
export const selectSort = (state: RootState) => state.decks.sort
