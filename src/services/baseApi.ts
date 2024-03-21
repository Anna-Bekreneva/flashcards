import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/services/baseApiWithReauth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Cards'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
