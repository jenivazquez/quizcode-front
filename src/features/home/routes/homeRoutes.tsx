import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import GuestRoute from '../../../app/routes/guards/GuestRoute'
import { HOME_PATHS as paths } from './homePaths'

const HomePage = lazy(() => import('../pages/HomePage'))

export const homeRoutes: RouteObject[] = [
  {
    element: <GuestRoute />,
    children: [
      { path: paths.root, element: <HomePage /> },
    ],
  },
]
