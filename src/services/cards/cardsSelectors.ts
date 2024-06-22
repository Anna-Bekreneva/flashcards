import { RootState } from '@/services'
export const selectCardCurrentPage = (state: RootState) => state.cards.currentPage
export const selectCardItemsPerPage = (state: RootState) => state.cards.itemsPerPage
export const selectPreviousCardId = (state: RootState) => state.cards.previousCardId
export const selectCardSearch = (state: RootState) => state.cards.search
export const selectCardSort = (state: RootState) => state.cards.sort
