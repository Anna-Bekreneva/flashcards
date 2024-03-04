import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { DeckPage, DecksPage, ErrorPage } from '@/pages'
import { LearnPage } from '@/pages/learnPage/learnPage.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
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
  //return <LearnPage deckId={'clpk0d0mc06w9wv2qt47hi1h9'} deckName={'pack name'} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])
