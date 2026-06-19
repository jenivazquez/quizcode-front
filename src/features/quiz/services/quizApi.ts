import { privateApi } from '../../../shared/api/privateApi'
import { publicApi } from '../../../shared/api/publicApi'
import type { CreateQuizResponse, QuizResponse } from './quizResponse'
import type { QuizCreate, QuizDetailToAnswer, QuizStatus } from '../types/quiz'

export async function createQuiz(ownerId: string, quiz: QuizCreate): Promise<string> {
  const response = await privateApi.post<CreateQuizResponse>(`/user/${ownerId}/quiz`, quiz)
  return response.data.id
}

export async function findAllQuizzes(ownerId: string): Promise<QuizResponse[]> {
  const response = await privateApi.get<QuizResponse[]>(`/user/${ownerId}/quiz`)
  return response.data
}

export async function findQuizById(ownerId: string, quizId: string): Promise<QuizResponse> {
  const response = await privateApi.get<QuizResponse>(`/user/${ownerId}/quiz/${quizId}`)
  return response.data
}

export async function updateQuiz(ownerId: string, quizId: string, quiz: QuizCreate): Promise<void> {
  await privateApi.patch(`/user/${ownerId}/quiz/${quizId}`, quiz)
}

export async function updateQuizStatus(ownerId: string, quizId: string, status: QuizStatus): Promise<void> {
  await privateApi.patch(`/user/${ownerId}/quiz/${quizId}/status`, { status })
}

export async function deleteQuiz(ownerId: string, quizId: string): Promise<void> {
  await privateApi.delete(`/user/${ownerId}/quiz/${quizId}`)
}

export async function findQuizByIdToAnswer(quizId: string): Promise<QuizDetailToAnswer> {
  const response = await publicApi.get<QuizResponse>(`/quiz/${quizId}`)
  return response.data
}
