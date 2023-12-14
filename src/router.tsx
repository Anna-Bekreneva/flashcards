import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  // useParams,
} from 'react-router-dom'

import { useGetCardsQuery } from '@/services/cards'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>hello</div>,
  },
]

export const Router = () => {
  // let { id } = useParams<{ id: string }>()
  // const res = useGetCardsQuery(id ?? '')
  const res = useGetCardsQuery('f2be95b9-4d07-4751-a775-bd612fc9553a')

  console.log(res)

  return <RouterProvider router={router} />
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
