import { useState, useEffect } from 'react'
import { findAllRooms } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import type { QuizRoomDetail } from '../types/room'

export const useListRooms = () => {

  const { userId } = useAuth()

  const [rooms, setRooms] = useState<QuizRoomDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)

  const refreshRooms = () => setRefresh(k => k + 1)

  useEffect(() => {
    if (!userId) return
    const loadRooms = async () => {
      setLoading(true)
      try {
        setRooms(await findAllRooms(userId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar la lista de salas'))
      } finally {
        setLoading(false)
      }
    }
    loadRooms()
  }, [userId, refresh])

  return { rooms, loading, error, refreshRooms }
}
