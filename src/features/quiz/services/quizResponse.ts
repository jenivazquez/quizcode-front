import type { QuizStatus } from '../types/quiz'

export interface QuizResponse {
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

export interface CreateQuizResponse {
  id: string
}
