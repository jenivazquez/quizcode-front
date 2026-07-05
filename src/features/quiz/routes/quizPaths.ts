export const QUIZ_PATHS = {
  list:   '/quizzes',
  create: '/quizzes/new',
  detail: (id: string) => `/quizzes/${id}`,
  edit:   (id: string) => `/quizzes/${id}/edit`,
} as const
