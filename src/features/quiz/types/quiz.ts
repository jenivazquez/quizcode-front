export const QuizStatus = {
  CREATED: 'CREATED',
  PUBLISHED: 'PUBLISHED',
  LOCKED: 'LOCKED',
} as const

export type QuizStatus = typeof QuizStatus[keyof typeof QuizStatus]

interface Quiz {
  id: string
  ownerId: string
  title: string
  description: string
  hasLimit: boolean
  limitMinutes: number | null
  status: QuizStatus
  createdAt: string
  updatedAt: string
}

export type QuizCreate = Pick<Quiz, 'title' | 'description' | 'hasLimit' | 'limitMinutes'>
export type QuizUpdate = Pick<Quiz, 'title' | 'description' | 'hasLimit' | 'limitMinutes'>
export type QuizDetail = Quiz
export type QuizDetailToAnswer = Pick<Quiz, 'id' | 'title' | 'description' | 'hasLimit' | 'limitMinutes'>
