import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { deletePartAsOwner } from '../services/participationApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { PATHS } from '../../../app/routes/paths'

export const useDeletePart = () => {

  const { quizId, roomId } = useParams<{ quizId: string, roomId: string }>()
  const { userId } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const remove = async (partId: string) => {
    if (!userId || !quizId || !roomId) return
    setLoading(true)
    setError(null)
    try {
      await deletePartAsOwner(userId, quizId, roomId, partId)
      const destination = PATHS.room.detail(quizId, roomId)
      if (location.pathname !== destination) navigate(destination)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al eliminar la participación'))
    } finally {
      setLoading(false)
    }
  }

  return { remove, loading, error }
}
