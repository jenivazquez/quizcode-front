import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import ProtectedRoute from '../../../app/routes/ProtectedRoute'
import { ROOM_PATHS } from './roomPaths'

const ListRoomPage        = lazy(() => import('../pages/ListRoomPage'))
const ListQuizRoomPage  = lazy(() => import('../pages/ListQuizRoomPage'))
const CreateRoomPage      = lazy(() => import('../pages/CreateRoomPage'))
const DetailRoomPage      = lazy(() => import('../pages/DetailRoomPage'))
const UpdateRoomPage      = lazy(() => import('../pages/UpdateRoomPage'))

export const roomRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: ROOM_PATHS.list,                            element: <ListRoomPage /> },
      { path: ROOM_PATHS.listByQuiz(':quizId'),            element: <ListQuizRoomPage /> },
      { path: ROOM_PATHS.create,                          element: <CreateRoomPage /> },
      { path: ROOM_PATHS.createForQuiz(':quizId'),         element: <CreateRoomPage /> },
      { path: ROOM_PATHS.detail(':quizId', ':roomId'),     element: <DetailRoomPage /> },
      { path: ROOM_PATHS.edit(':quizId', ':roomId'),       element: <UpdateRoomPage /> },
    ],
  },
]
