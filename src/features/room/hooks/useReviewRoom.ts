import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { markRoomAsReviewed } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'

export const useReviewRoom = () => {

  const { quizId, roomId } = useParams<{ quizId: string, roomId: string }>()
  const { userId } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const markAsReview = async () => {
    if (!userId || !quizId || !roomId) return
    setLoading(true)
    setError(null)
    try {
      await markRoomAsReviewed(userId, quizId, roomId)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al marcar la sala como revisada'))
    } finally {
      setLoading(false)
    }
  }

  return { markAsReview, loading, error }
}
