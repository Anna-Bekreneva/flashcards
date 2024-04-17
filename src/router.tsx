import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Header } from '@/components'
import {
  DeckPage,
  DecksPage,
  ErrorPage,
  ForgotPasswordPage,
  LoginPage,
  CheckEmailPage,
  SignUpPage,
  CreateNewPasswordPage,
  LearnPage,
  PersonalInformationPage,
  VerifyEmailPage,
} from '@/pages'
import { useMeQuery } from '@/services'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/check-email',
    element: <CheckEmailPage />,
  },
  {
    path: '/recover-password/:id',
    element: <CreateNewPasswordPage />,
  },
  {
    path: '/verify-email/:id',
    element: <VerifyEmailPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DecksPage />,
  },
  {
    path: '/decks/deck/:id',
    element: <DeckPage />,
  },
  {
    path: '/decks/deck/cards/:id',
    element: <LearnPage />,
  },
  { path: '/profile', element: <PersonalInformationPage /> },
]

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isError, data } = useMeQuery()

  return !isError ? (
    <>
      <Header userEmail={data?.email} userName={data?.name} avatar={data?.avatar} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  )
}

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])
