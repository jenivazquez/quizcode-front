import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { findQuestionsByQuizId } from '../services/questionApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import type { QuestionDetail } from '../types/question'

export const useListQuestions = () => {

  const { id: quizId } = useParams<{ id: string }>()
  const { userId } = useAuth()

  const [questions, setQuestions] = useState<QuestionDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)
  
  const refreshQuestions = () => setRefresh(k => k + 1)

  useEffect(() => {
    if (!userId || !quizId) return
    const findQuestions = async () => {
      setLoading(true)
      try {
        setQuestions(await findQuestionsByQuizId(userId, quizId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar las preguntas'))
      } finally {
        setLoading(false)
      }
    }
    findQuestions()
  }, [userId, quizId, refresh])

  return { questions, loading, error, refreshQuestions }
}
