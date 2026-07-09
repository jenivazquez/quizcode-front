import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import ProtectedRouteUser from '../../../app/routes/guards/ProtectedRouteUser'
import GuestRoute from '../../../app/routes/guards/GuestRoute'
import { USER_PATHS as paths } from './userPaths'

const CreateUserPage = lazy(() => import('../pages/CreateUserPage'))
const DetailUserPage = lazy(() => import('../pages/DetailUserPage'))
const UpdateUserPage = lazy(() => import('../pages/UpdateUserPage'))

export const userRoutes: RouteObject[] = [
  {
    element: <GuestRoute />,
    children: [
      { path: paths.register, element: <CreateUserPage /> },
    ],
  },
  {
    element: <ProtectedRouteUser />,
    children: [
      { path: paths.profile, element: <DetailUserPage /> },
      { path: paths.edit, element: <UpdateUserPage /> },
    ],
  },
]
 