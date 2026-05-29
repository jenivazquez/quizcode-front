import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { findRoomById } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import type { QuizRoomDetail } from '../types/room'

export const useDetailRoom = () => {

  const { quizId, roomId } = useParams<{ quizId: string, roomId: string }>()
  const { userId } = useAuth()

  const [room, setRoom] = useState<QuizRoomDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)

  const refreshRoom = () => setRefresh(k => k + 1)

  useEffect(() => {
    if (!userId || !quizId || !roomId) return
    const findRoom = async () => {
      setLoading(true)
      try {
        setRoom(await findRoomById(userId, quizId, roomId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar la sala'))
      } finally {
        setLoading(false)
      }
    }
    findRoom()
  }, [userId, quizId, roomId, refresh])

  return { room, loading, error, refreshRoom }
}
