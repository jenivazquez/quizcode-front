import type { PartStatus, ReviewStatus } from '../types/participation'

export interface AnswerResponse {
  questionId: string
  codeOptions: string[] | null
  writtenAnswer: string | null
  isCorrect: boolean
  score: number
  feedback: string | null
}

export interface PartResponse {
  id: string
  roomId: string
  username: string
  status: PartStatus
  reviewStatus: ReviewStatus
  startedAt: string
  finishedAt: string
  totalScore: number
  totalTime: number
  answers: AnswerResponse[]
}

export interface PartRankingResponse {
  username: string
  totalScore: number
  totalTime: number
  reviewStatus: ReviewStatus
}

export interface IdPartResponse {
  id: string
}

export interface LoginPartResponse {
  id: string
  status: PartStatus
}
