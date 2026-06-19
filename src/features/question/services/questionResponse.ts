import type { QuestionType } from '../types/question'

export interface OptionResponse {
  code: string
  value: string
  isValid?: boolean
}

export interface QuestionResponse {
  id: string
  quizId: string
  statement: string
  baseCode: string | null
  type: QuestionType
  order: number
  score: number
  options: OptionResponse[] | null
}

export interface CreateQuestionResponse {
  id: string
}
