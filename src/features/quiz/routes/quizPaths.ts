export const QUIZ_PATHS = {
  list: '/quiz',
  create: '/quiz/new',
  edit: (id: string) => `/quiz/${id}/edit`,
  update: (id: string) => `/quiz/${id}/update`,
} as const
