import { useState, useEffect } from 'react'
import { findAllQuizzes } from '../services/quizApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import type { QuizDetail } from '../types/quiz'

export const useListQuiz = () => {

  const { userId } = useAuth()
  
  const [quizzes, setQuizzes] = useState<QuizDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)

  const refreshQuizzes = () => setRefresh(k => k + 1)

  useEffect(() => {
    if (!userId) return
    const findQuizzes = async () => {
      setLoading(true)
      try {
        setQuizzes(await findAllQuizzes(userId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar la lista de cuestionarios'))
      } finally {
        setLoading(false)
      }
    }
    findQuizzes()
  }, [userId, refresh])

  return { quizzes, loading, error, refreshQuizzes }
}
