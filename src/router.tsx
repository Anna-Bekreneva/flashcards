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
} from '@/pages'
import { LearnPage } from '@/pages/learnPage/learnPage.tsx'
import { useMeQuery } from '@/services'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
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
]

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isError, data } = useMeQuery()

  const isAuthenticated = !isError

  return isAuthenticated ? (
    <>
      <Header userEmail={data?.email} userName={data?.name} />
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
