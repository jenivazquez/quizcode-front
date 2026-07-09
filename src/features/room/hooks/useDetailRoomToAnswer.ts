import { useState, useEffect } from 'react'
import { findRoomByIdToAnswer } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { getErrorStatus } from '../../../shared/utils/getErrorStatus'
import { partSessionStore } from '../../../shared/session/partSessionStore'
import type { QuizRoomDetail } from '../types/room'
import { useParams } from 'react-router-dom'
import { INTERVAL_RANKING_MS } from '../../participation/constants/participationConstants'

export const useDetailRoomToAnswer = (autoLoop?: boolean) => {

  const { roomId } = useParams<{ roomId: string}>()

  const [room, setRoom] = useState<QuizRoomDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!roomId) return
    let intervalId: ReturnType<typeof setInterval> | undefined = undefined
    const findRoom = async () => {
      setError(null)
      try {
        setRoom(await findRoomByIdToAnswer(roomId))
      } catch (err) {
        if (getErrorStatus(err) === 404) { clearInterval(intervalId); partSessionStore.clear('deleted') }
        setError(getErrorMessage(err, 'Error al cargar la sala'))
      } finally {
        setLoading(false)
      }
    }
    findRoom()
    if (!autoLoop || room?.reviewed) return
    intervalId = setInterval(findRoom, INTERVAL_RANKING_MS)
    return () => clearInterval(intervalId)
  }, [roomId, autoLoop, room?.reviewed])

  return { room, loading, error }
}
