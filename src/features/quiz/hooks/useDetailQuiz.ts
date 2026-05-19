import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { findQuizById } from '../services/quizApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import type { QuizDetail } from '../types/quiz'

export const useDetailQuiz = () => {
  
  const { id: quizId } = useParams<{ id: string }>()
  const { userId } = useAuth()

  const [quiz, setQuiz] = useState<QuizDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)

  const refreshQuiz = () => setRefresh(k => k + 1)

  useEffect(() => {
    if (!userId || !quizId) return
    const findQuiz = async () => {
      setLoading(true)
      try {
        setQuiz(await findQuizById(userId, quizId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar el cuestionario'))
      } finally {
        setLoading(false)
      }
    }
    findQuiz()
  }, [userId, quizId, refresh])

  return { quiz, loading, error, refreshQuiz }
}
