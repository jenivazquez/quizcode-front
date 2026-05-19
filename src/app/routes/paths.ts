import { AUTH_PATHS } from '../../features/auth/routes/authPaths'
import { HOME_PATHS } from '../../features/home/routes/homePaths'
import { USER_PATHS } from '../../features/user/routes/userPaths'
import { QUIZ_PATHS } from '../../features/quiz/routes/quizPaths'

export const PATHS = {
  ...HOME_PATHS,
  ...AUTH_PATHS,
  ...USER_PATHS,
  ...QUIZ_PATHS,
} as const
