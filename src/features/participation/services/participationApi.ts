import { publicApi } from '../../../shared/api/publicApi'
import { privateApi } from '../../../shared/api/privateApi'
import type { PartResponse, PartRankingResponse, IdPartResponse, LoginPartResponse } from './participationResponse'
import type { PartCreate, PartLogin, PartDetail, PartRankingDetail, AnswerSubmit } from '../types/participation'

export async function createPart(roomId: string, data: PartCreate): Promise<string> {
  const response = await publicApi.post<IdPartResponse>(`/room/${roomId}/participation`, data)
  return response.data.id
}

export async function loginPart(roomId: string, data: PartLogin): Promise<LoginPartResponse> {
  const response = await publicApi.post<LoginPartResponse>(`/room/${roomId}/participation/login`, data)
  return response.data
}

export async function findPartById(roomId: string, partId: string): Promise<PartDetail> {
  const response = await publicApi.get<PartResponse>(`/room/${roomId}/participation/${partId}`)
  return response.data
}

export async function submitAnswers(roomId: string, partId: string, answers: AnswerSubmit[]): Promise<void> {
  await publicApi.patch(`/room/${roomId}/participation/${partId}`, answers)
}

export async function findPartsRanking(roomId: string): Promise<PartRankingDetail[]> {
  const response = await publicApi.get<PartRankingResponse[]>(`/room/${roomId}/participation/ranking`)
  return response.data
}

export async function findPartsByRoomAsOwner(ownerId: string, quizId: string, roomId: string): Promise<PartDetail[]> {
  const response = await privateApi.get<PartResponse[]>(`/user/${ownerId}/quiz/${quizId}/room/${roomId}/participation`)
  return response.data
}

export async function deletePartAsOwner(ownerId: string, quizId: string, roomId: string, partId: string): Promise<void> {
  await privateApi.delete(`/user/${ownerId}/quiz/${quizId}/room/${roomId}/participation/${partId}`)
}
