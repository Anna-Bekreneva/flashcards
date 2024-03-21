import { SignInFormValues } from '@/components'
import { baseApi } from '@/services'
import { meResponseType } from '@/services/auth/authTypes.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<meResponseType, void>({
        query: () => ({
          url: '/v1/auth/me',
        }),
      }),
      login: builder.mutation<{ accessToken: string }, SignInFormValues>({
        query: body => ({
          url: '/v1/auth/login',
          method: 'POST',
          body,
        }),
      }),
    }
  },
})

export const { useMeQuery, useLoginMutation } = authService
