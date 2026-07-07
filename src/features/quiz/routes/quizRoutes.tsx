import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import ProtectedRouteUser from '../../../app/routes/guards/ProtectedRouteUser'
import { QUIZ_PATHS } from './quizPaths'

const ListQuizPage = lazy(() => import('../pages/ListQuizPage'))
const CreateQuizPage = lazy(() => import('../pages/CreateQuizPage'))
const DetailQuizPage = lazy(() => import('../pages/DetailQuizPage'))
const UpdateQuizPage = lazy(() => import('../pages/UpdateQuizPage'))

export const quizRoutes: RouteObject[] = [
  {
    element: <ProtectedRouteUser />,
    children: [
      { path: QUIZ_PATHS.list, element: <ListQuizPage /> },
      { path: QUIZ_PATHS.create, element: <CreateQuizPage /> },
      { path: QUIZ_PATHS.detail(':quizId'), element: <DetailQuizPage /> },
      { path: QUIZ_PATHS.edit(':quizId'), element: <UpdateQuizPage /> },
    ],
  },
]
