import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { PART_PATHS } from './participationPaths'

const CreatePartPage      = lazy(() => import('../pages/CreatePartPage'))
const LoginPartPage       = lazy(() => import('../pages/LoginPartPage'))
const AnswerQuizPartPage  = lazy(() => import('../pages/AnswerQuizPartPage'))
const RankingPartPage     = lazy(() => import('../pages/RankingPartPage'))
const DetailPartPage      = lazy(() => import('../pages/DetailPartPage'))

export const participationRoutes: RouteObject[] = [
  { path: PART_PATHS.create(':roomId'),                  element: <CreatePartPage /> },
  { path: PART_PATHS.login(':roomId'),                   element: <LoginPartPage /> },
  { path: PART_PATHS.answerQuiz(':roomId', ':partId'),   element: <AnswerQuizPartPage /> },
  { path: PART_PATHS.ranking(':roomId', ':partId'),      element: <RankingPartPage /> },
  { path: PART_PATHS.detail(':roomId', ':partId'),       element: <DetailPartPage /> },
]
