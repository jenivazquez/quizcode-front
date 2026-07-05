import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { findQuestionsByQuizIdToReview } from '../services/questionApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import type { QuestionDetail } from '../types/question'

export const useListQuestionsToReview = (quizId: string | undefined) => {

  const { partId } = useParams<{ partId: string }>()

  const [questions, setQuestions] = useState<QuestionDetail[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!quizId || !partId) return
    const findQuestions = async () => {
      setLoading(true)
      setError(null)
      try {
        setQuestions(await findQuestionsByQuizIdToReview(quizId, partId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar las preguntas'))
      } finally {
        setLoading(false)
      }
    }
    findQuestions()
  }, [quizId, partId])

  return { questions, loading, error }
}
