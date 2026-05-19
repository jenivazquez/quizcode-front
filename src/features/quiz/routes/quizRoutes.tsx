import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import ProtectedRoute from '../../../app/routes/ProtectedRoute'
import { QUIZ_PATHS } from './quizPaths'

const QuizListPage = lazy(() => import('../pages/ListQuizPage'))
const CreateQuizPage = lazy(() => import('../pages/CreateQuizPage'))
const DetailQuizPage = lazy(() => import('../pages/DetailQuizPage'))
const UpdateQuizPage = lazy(() => import('../pages/UpdateQuizPage'))

export const quizRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: QUIZ_PATHS.list, element: <QuizListPage /> },
      { path: QUIZ_PATHS.create, element: <CreateQuizPage /> },
      { path: QUIZ_PATHS.edit(':id'), element: <DetailQuizPage /> },
      { path: QUIZ_PATHS.update(':id'), element: <UpdateQuizPage /> },
    ],
  },
]
