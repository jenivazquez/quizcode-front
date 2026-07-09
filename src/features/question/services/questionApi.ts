import { privateApiUser } from '../../../shared/api/privateApiUser'
import { privateApiPart } from '../../../shared/api/privateApiPart'
import type { QuestionResponse, CreateQuestionResponse } from './questionResponse'
import type { QuestionDetail, QuestionCreate, QuestionUpdate, Message, AIQuestion } from '../types/question'

export async function findQuestionsByQuizIdToAnswer(quizId: string, partId: string): Promise<QuestionDetail[]> {
  const response = await privateApiPart.get<QuestionResponse[]>(`/quiz/${quizId}/question?partId=${partId}`)
  return response.data
}

export async function findQuestionsByQuizIdToReview(quizId: string, partId: string): Promise<QuestionDetail[]> {
  const response = await privateApiPart.get<QuestionResponse[]>(`/quiz/${quizId}/question/review?partId=${partId}`)
  return response.data
}

export async function findQuestionsByQuizId(ownerId: string, quizId: string): Promise<QuestionDetail[]> {
  const response = await privateApiUser.get<QuestionResponse[]>(`/user/${ownerId}/quiz/${quizId}/question`)
  return response.data
}

export async function createQuestion(ownerId: string, quizId: string, question: QuestionCreate): Promise<string> {
  const response = await privateApiUser.post<CreateQuestionResponse>(`/user/${ownerId}/quiz/${quizId}/question`, question)
  return response.data.id
}

export async function updateQuestion(ownerId: string, quizId: string, questionId: string, question: QuestionUpdate): Promise<void> {
  await privateApiUser.patch(`/user/${ownerId}/quiz/${quizId}/question/${questionId}`, question)
}

export async function deleteQuestion(ownerId: string, quizId: string, questionId: string): Promise<void> {
  await privateApiUser.delete(`/user/${ownerId}/quiz/${quizId}/question/${questionId}`)
}

export async function generateQuestion(ownerId: string, quizId: string, messages: Message[]): Promise<AIQuestion> {
  const response = await privateApiUser.post<AIQuestion>(`/user/${ownerId}/quiz/${quizId}/question/generate`, messages)
  return response.data
}
