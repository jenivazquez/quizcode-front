import { AUTH_PATHS } from '../../features/auth/routes/authPaths'
import { HOME_PATHS } from '../../features/home/routes/homePaths'
import { USER_PATHS } from '../../features/user/routes/userPaths'
import { QUIZ_PATHS } from '../../features/quiz/routes/quizPaths'
import { ROOM_PATHS } from '../../features/room/routes/roomPaths'

export const PATHS = {
  home: HOME_PATHS,
  auth: AUTH_PATHS,
  user: USER_PATHS,
  quiz: QUIZ_PATHS,
  room: ROOM_PATHS,
} as const
