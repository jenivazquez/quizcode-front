import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { deleteQuestion } from '../services/questionApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'

export const useDeleteQuestion = () => {

  const { id: quizId } = useParams<{ id: string }>()
  const { userId } = useAuth()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const remove = async (questionId: string) => {
    if (!userId || !quizId) return
    setLoading(true)
    setError(null)
    try {
      await deleteQuestion(userId, quizId, questionId)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al eliminar la pregunta'))
    } finally {
      setLoading(false)
    }
  }

  return { remove, loading, error }
}
