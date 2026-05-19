import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { AUTH_PATHS as paths} from './authPaths'

const LoginPage = lazy(() => import('../pages/LoginPage'))

export const authRoutes: RouteObject[] = [
  { path: paths.login, element: <LoginPage /> },
]