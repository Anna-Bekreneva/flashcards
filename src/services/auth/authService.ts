import { SignInFormValues, SignUpFormValues } from '@/components'
import { baseApi } from '@/services'
import { meResponseType } from '@/services/auth/authTypes.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<meResponseType, void>({
        query: () => ({
          url: '/v1/auth/me',
        }),
        providesTags: ['Me'],
      }),
      login: builder.mutation<{ accessToken: string }, SignInFormValues>({
        query: body => ({
          url: '/v1/auth/login',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Me'],
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
        invalidatesTags: ['Me'],
      }),
      updateUserData: builder.mutation<meResponseType, { avatar: string; name: string }>({
        query: body => ({
          url: '/v1/auth/me',
          method: 'PATCH',
          body,
        }),
      }),
      signUp: builder.mutation<meResponseType, Omit<SignUpFormValues, 'confirmPassword'>>({
        query: body => ({
          url: '/v1/auth/sign-up',
          method: 'POST',
          body: {
            html: '<b>Hello, ##name##!</b><br/>Please confirm your email by clicking on the link below:<br/><a href="http://localhost:3000/confirm-email/##token##">Confirm email</a>. If it doesn\'t work, copy and paste the following link in your browser:<br/>http://localhost:3000/confirm-email/##token##',
            subject: 'creating a new user account',
            sendConfirmationEmail: true,
            ...body,
          },
        }),
        invalidatesTags: ['Me'],
      }),
      sendVerificationEmailAgain: builder.mutation<void, { userId: string }>({
        query: body => ({
          url: '/v1/auth/resend-verification-email',
          method: 'POST',
          body: {
            html: '<b>Hello, ##name##!</b><br/>Please confirm your email by clicking on the link below:<br/><a href="http://localhost:3000/confirm-email/##token##">Confirm email</a>. If it doesn\'t work, copy and paste the following link in your browser:<br/>http://localhost:3000/confirm-email/##token##',
            userId: body.userId,
            subject: 'send verification email again',
          },
        }),
      }),
      logout: builder.mutation<void, void>({
        query: () => ({
          url: '/v1/auth/logout',
          method: 'POST',
        }),
        invalidatesTags: ['Me'],
      }),
      resetPassword: builder.mutation<void, { token: string; password: string }>({
        query: body => ({
          url: `/v1/auth/reset-password/${body.token}`,
          method: 'POST',
          body: {
            password: body.password,
          },
        }),
        invalidatesTags: ['Me'],
      }),
    }
  },
})

export const {
  useMeQuery,
  useLoginMutation,
  useRecoverPasswordMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useSignUpMutation,
  useUpdateUserDataMutation,
  useSendVerificationEmailAgainMutation,
} = authService
