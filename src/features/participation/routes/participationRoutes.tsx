import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import GuestRoute from '../../../app/routes/guards/GuestRoute'
import ProtectedRouteUser from '../../../app/routes/guards/ProtectedRouteUser'
import ProtectedRoutePart from '../../../app/routes/guards/ProtectedRoutePart'
import { PART_PATHS } from './participationPaths'

const CreatePartPage        = lazy(() => import('../pages/CreatePartPage'))
const LoginPartPage         = lazy(() => import('../pages/LoginPartPage'))
const AnswerQuizPartPage    = lazy(() => import('../pages/AnswerQuizPartPage'))
const RankingPartPage       = lazy(() => import('../pages/RankingPartPage'))
const DetailPartPage        = lazy(() => import('../pages/DetailPartPage'))
const DetailPartOwnerPage   = lazy(() => import('../pages/DetailPartOwnerPage'))

export const participationRoutes: RouteObject[] = [
  {
    element: <GuestRoute />,
    children: [
      { path: PART_PATHS.create(':roomId'), element: <CreatePartPage /> },
      { path: PART_PATHS.login(':roomId'),  element: <LoginPartPage /> },
    ],
  },
  {
    element: <ProtectedRoutePart />,
    children: [
      { path: PART_PATHS.answerQuiz(':roomId', ':partId'), element: <AnswerQuizPartPage /> },
      { path: PART_PATHS.ranking(':roomId', ':partId'),    element: <RankingPartPage /> },
      { path: PART_PATHS.detail(':roomId', ':partId'),     element: <DetailPartPage /> },
    ],
  },
  {
    element: <ProtectedRouteUser />,
    children: [
      { path: PART_PATHS.ownerDetail(':quizId', ':roomId', ':partId'), element: <DetailPartOwnerPage /> },
    ],
  },
]
