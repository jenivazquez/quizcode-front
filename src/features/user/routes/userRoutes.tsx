import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import ProtectedRoute from '../../../app/routes/ProtectedRoute'
import { USER_PATHS as paths } from './userPaths'

const CreateUserPage = lazy(() => import('../pages/CreateUserPage'))
const DetailUserPage = lazy(() => import('../pages/DetailUserPage'))
const UpdateUserPage = lazy(() => import('../pages/UpdateUserPage'))

export const userRoutes: RouteObject[] = [
  { path: paths.register, element: <CreateUserPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: paths.profile, element: <DetailUserPage /> },
      { path: paths.profileEdit, element: <UpdateUserPage /> },
    ],
  },
]
 