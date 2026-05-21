import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import GuestRoute from '../../../app/routes/GuestRoute'
import { AUTH_PATHS as paths} from './authPaths'

const LoginPage = lazy(() => import('../pages/LoginPage'))

export const authRoutes: RouteObject[] = [
  {
    element: <GuestRoute />,
    children: [
      { path: paths.login, element: <LoginPage /> },
    ],
  },
]