import type { RoomStatus } from '../types/room'

export interface RoomResponse {
  id: string
  name: string
  description: string
  code: string | null
  status: RoomStatus
  reviewed: boolean
  quizId: string
  createdAt: string
  startedAt: string | null
  finishedAt: string | null
}

export interface QuizRoomResponse extends RoomResponse {
  quizTitle: string
}

export interface CreateRoomResponse {
  id: string
}
