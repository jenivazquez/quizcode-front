import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { HOME_PATHS as paths } from './homePaths'

const HomePage = lazy(() => import('../pages/HomePage'))

export const homeRoutes: RouteObject[] = [
  { path: paths.root, element: <HomePage /> },
]
