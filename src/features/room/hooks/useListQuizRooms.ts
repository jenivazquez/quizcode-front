import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { findRoomsByQuizId } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import type { QuizRoomDetail } from '../types/room'

export const useListQuizRooms = () => {

  const { quizId } = useParams<{ quizId: string }>()
  const { userId } = useAuth()

  const [rooms, setRooms] = useState<QuizRoomDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)

  const refreshRooms = () => setRefresh(k => k + 1)

  useEffect(() => {
    if (!userId || !quizId) return
    const findQuizRooms = async () => {
      setLoading(true)
      try {
        setRooms(await findRoomsByQuizId(userId, quizId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar las salas del cuestionario'))
      } finally {
        setLoading(false)
      }
    }
    findQuizRooms()
  }, [userId, quizId, refresh])

  return { rooms, loading, error, refreshRooms }
}
