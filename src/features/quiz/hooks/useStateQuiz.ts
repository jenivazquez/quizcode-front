import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateQuizStatus } from '../services/quizApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import { QuizStatus } from '../types/quiz'

export const useStateQuiz = () => {

  const { quizId } = useParams<{ quizId: string }>()
  const { userId } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeStatus = async (status: QuizStatus) => {
    if (!userId || !quizId) return
    setLoading(true)
    setError(null)
    try {
      await updateQuizStatus(userId, quizId, status)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al cambiar el estado del cuestionario'))
    } finally {
      setLoading(false)
    }
  }

  const publish   = () => changeStatus(QuizStatus.PUBLISHED)
  const unpublish  = () => changeStatus(QuizStatus.CREATED)

  return { publish, unpublish, loading, error }
}
