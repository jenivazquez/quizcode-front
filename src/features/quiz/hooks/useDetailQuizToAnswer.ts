import { useState, useEffect } from 'react'
import { findQuizByIdToAnswer } from '../services/quizApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import type { QuizDetailToAnswer } from '../types/quiz'

export const useDetailQuizToAnswer = (quizId: string | undefined) => {

  const [quiz, setQuiz] = useState<QuizDetailToAnswer | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!quizId) return
    const findQuiz = async () => {
      setLoading(true)
      setError(null)
      try {
        setQuiz(await findQuizByIdToAnswer(quizId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar el cuestionario'))
      } finally {
        setLoading(false)
      }
    }
    findQuiz()
  }, [quizId])

  return { quiz, loading, error }
}
