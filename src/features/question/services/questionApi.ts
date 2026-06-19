import { privateApi } from '../../../shared/api/privateApi'
import { publicApi } from '../../../shared/api/publicApi'
import type { QuestionResponse, CreateQuestionResponse } from './questionResponse'
import type { QuestionDetail, QuestionCreate, QuestionUpdate } from '../types/question'

export async function findQuestionsByQuizIdToAnswer(quizId: string, partId: string): Promise<QuestionDetail[]> {
  const response = await publicApi.get<QuestionResponse[]>(`/quiz/${quizId}/question?partId=${partId}`)
  return response.data
}

export async function findQuestionsByQuizIdToReview(quizId: string, partId: string): Promise<QuestionDetail[]> {
  const response = await publicApi.get<QuestionResponse[]>(`/quiz/${quizId}/question/review?partId=${partId}`)
  return response.data
}

export async function findQuestionsByQuizId(ownerId: string, quizId: string): Promise<QuestionDetail[]> {
  const response = await privateApi.get<QuestionResponse[]>(`/user/${ownerId}/quiz/${quizId}/question`)
  return response.data
}

export async function createQuestion(ownerId: string, quizId: string, question: QuestionCreate): Promise<string> {
  const response = await privateApi.post<CreateQuestionResponse>(`/user/${ownerId}/quiz/${quizId}/question`, question)
  return response.data.id
}

export async function updateQuestion(ownerId: string, quizId: string, questionId: string, question: QuestionUpdate): Promise<void> {
  await privateApi.patch(`/user/${ownerId}/quiz/${quizId}/question/${questionId}`, question)
}

export async function deleteQuestion(ownerId: string, quizId: string, questionId: string): Promise<void> {
  await privateApi.delete(`/user/${ownerId}/quiz/${quizId}/question/${questionId}`)
}
