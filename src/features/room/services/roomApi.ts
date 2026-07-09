import { privateApiUser } from '../../../shared/api/privateApiUser'
import { publicApi } from '../../../shared/api/publicApi'
import type { CreateRoomResponse, QuizRoomResponse, RoomResponse } from './roomResponse'
import type { RoomCreate, RoomUpdate, QuizRoomDetail, RoomDetail } from '../types/room'

export async function createRoom(ownerId: string, quizId: string, room: RoomCreate): Promise<string> {
  const response = await privateApiUser.post<CreateRoomResponse>(`/user/${ownerId}/quiz/${quizId}/room`, room)
  return response.data.id
}

export async function findAllRooms(ownerId: string): Promise<QuizRoomDetail[]> {
  const response = await privateApiUser.get<QuizRoomResponse[]>(`/user/${ownerId}/room`)
  return response.data
}

export async function findRoomsByQuizId(ownerId: string, quizId: string): Promise<QuizRoomDetail[]> {
  const response = await privateApiUser.get<QuizRoomResponse[]>(`/user/${ownerId}/quiz/${quizId}/room`)
  return response.data
}

export async function findRoomById(ownerId: string, quizId: string, roomId: string): Promise<QuizRoomDetail> {
  const response = await privateApiUser.get<QuizRoomResponse>(`/user/${ownerId}/quiz/${quizId}/room/${roomId}`)
  return response.data
}

export async function updateRoom(ownerId: string, quizId: string, roomId: string, room: RoomUpdate): Promise<void> {
  await privateApiUser.patch(`/user/${ownerId}/quiz/${quizId}/room/${roomId}`, room)
}

export async function updateRoomStatus(ownerId: string, quizId: string, roomId: string, status: string): Promise<void> {
  await privateApiUser.patch(`/user/${ownerId}/quiz/${quizId}/room/${roomId}/status`, { status })
}

export async function deleteRoom(ownerId: string, quizId: string, roomId: string): Promise<void> {
  await privateApiUser.delete(`/user/${ownerId}/quiz/${quizId}/room/${roomId}`)
}

export async function markRoomAsReviewed(ownerId: string, quizId: string, roomId: string): Promise<void> {
  await privateApiUser.patch(`/user/${ownerId}/quiz/${quizId}/room/${roomId}/reviewed`, { reviewed: true })
}

export async function findRoomByCode(code: string): Promise<RoomDetail> {
  const response = await publicApi.get<RoomResponse>(`/room/code/${code}`)
  return response.data
}

export async function findRoomByIdToAnswer(roomId: string): Promise<QuizRoomDetail> {
  const response = await publicApi.get<QuizRoomResponse>(`/room/${roomId}`)
  return response.data
}
