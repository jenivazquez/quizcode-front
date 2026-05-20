import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteQuiz } from '../services/quizApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import { PATHS } from '../../../app/routes/paths'

export const useDeleteQuiz = () => {

  const { userId } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const remove = async (quizId: string) => {
    if (!userId || !quizId) return
    setLoading(true)
    setError(null)
    try {
      await deleteQuiz(userId, quizId)
      navigate(PATHS.list)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al eliminar el cuestionario'))
    } finally {
      setLoading(false)
    }
  }

  return { remove, loading, error }
}
