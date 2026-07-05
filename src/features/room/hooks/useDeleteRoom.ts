import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteRoom } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import { PATHS } from '../../../app/routes/paths'

export const useDeleteRoom = (navigateTo: string = PATHS.room.list) => {

  const { userId } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const remove = async (quizId: string, roomId: string) => {
    if (!userId || !quizId || !roomId) return
    setLoading(true)
    setError(null)
    try {
      await deleteRoom(userId, quizId, roomId)
      navigate(navigateTo)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al eliminar la sala'))
    } finally {
      setLoading(false)
    }
  }

  return { remove, loading, error }
}
