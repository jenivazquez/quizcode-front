import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateQuizStatus } from '../services/quizApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import { QuizStatus } from '../types/quiz'

export const useStateQuiz = () => {

  const { id: quizId } = useParams<{ id: string }>()
  const { userId } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const publish = async () => {
    if (!userId || !quizId) return
    setLoading(true)
    setError(null)
    try {
      await updateQuizStatus(userId, quizId, QuizStatus.PUBLISHED)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al publicar el cuestionario'))
    } finally {
      setLoading(false)
    }
  }

  const unpublish = async () => {
    if (!userId || !quizId) return
    setLoading(true)
    setError(null)
    try {
      await updateQuizStatus(userId, quizId, QuizStatus.CREATED)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al despublicar el cuestionario'))
    } finally {
      setLoading(false)
    }
  }

  return { publish, unpublish, loading, error }
}
