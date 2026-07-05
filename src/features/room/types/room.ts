export const RoomStatus = {
  CREATED: 'CREATED',
  OPENED:  'OPENED',
  PAUSED:  'PAUSED',
  CLOSED:  'CLOSED',
} as const

export type RoomStatus = typeof RoomStatus[keyof typeof RoomStatus]

interface Room {
  id: string
  name: string
  description: string
  code: string | null
  status: RoomStatus
  reviewed: boolean
  quizId: string
  quizTitle: string
  createdAt: string
  startedAt: string | null
  finishedAt: string | null
}

export type RoomDetail = Omit<Room, 'quizTitle'>
export type QuizRoomDetail = Room
export type RoomCreate = Pick<Room, 'name' | 'description'>
export type RoomUpdate = Pick<Room, 'name' | 'description'>
