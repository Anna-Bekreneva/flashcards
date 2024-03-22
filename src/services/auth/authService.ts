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
      recoverPassword: builder.mutation<void, { email: string }>({
        query: body => ({
          url: '/v1/auth/recover-password',
          method: 'POST',
          body: {
            html: '<h1>Hi, ##name##</h1><p>Click <a href="##token##">here</a> to recover your password</p>',
            email: body.email,
            subject: 'Password recovery',
          },
        }),
      }),
    }
  },
})

export const { useMeQuery, useLoginMutation, useRecoverPasswordMutation } = authService
