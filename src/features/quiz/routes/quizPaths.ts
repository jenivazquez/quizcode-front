export const QUIZ_PATHS = {
  list:   '/quizzes',
  create: '/quizzes/new',
  detail: (quizId: string) => `/quizzes/${quizId}`,
  edit:   (quizId: string) => `/quizzes/${quizId}/edit`,
} as const
