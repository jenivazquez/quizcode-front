export const ROOM_PATHS = {
  list:           '/rooms',
  listByQuiz:     (quizId: string) => `/quizzes/${quizId}/rooms`,
  create:         '/rooms/new',
  createForQuiz:  (quizId: string) => `/quizzes/${quizId}/rooms/new`,
  detail:         (quizId: string, roomId: string) => `/quizzes/${quizId}/rooms/${roomId}`,
  edit:           (quizId: string, roomId: string) => `/quizzes/${quizId}/rooms/${roomId}/edit`,
} as const
