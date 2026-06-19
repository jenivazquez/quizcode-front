export const PART_PATHS = {
  create:      (roomId: string)                  => `/rooms/${roomId}/participations/new`,
  login:       (roomId: string)                  => `/rooms/${roomId}/participations/login`,
  answerQuiz:  (roomId: string, partId: string)  => `/rooms/${roomId}/participations/${partId}/quiz`,
  ranking:     (roomId: string, partId: string)  => `/rooms/${roomId}/participations/${partId}/ranking`,
  detail:      (roomId: string, partId: string)  => `/rooms/${roomId}/participations/${partId}`,
} as const
