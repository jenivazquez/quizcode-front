import type { RouteObject } from 'react-router-dom'
import MainLayout from '../../shared/layouts/MainLayout'
import { authRoutes } from '../../features/auth/routes/authRoutes'
import { userRoutes } from '../../features/user/routes/userRoutes'
import { homeRoutes } from '../../features/home/routes/homeRoutes'
import { quizRoutes } from '../../features/quiz/routes/quizRoutes'

export const appRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      ...homeRoutes,
      ...authRoutes,
      ...userRoutes,
      ...quizRoutes,
    ],
  },
]