import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { QuizSchema, type QuizFormData } from '../schemas/quizSchema'
import { updateQuiz } from '../services/quizApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useDetailQuiz } from './useDetailQuiz'
import type { QuizUpdate } from '../types/quiz'

const buildQuiz = (data: QuizFormData): QuizUpdate => ({
  title: data.title,
  description: data.description,
  hasLimit: data.hasLimit,
  limitMinutes: data.hasLimit ? (data.limitMinutes || null) : null,
})

export const useUpdateQuiz = () => {

  const { userId } = useAuth()
  const { quizId } = useParams<{ quizId: string }>()

  const { quiz, loading: loadingQuiz } = useDetailQuiz()
  const navigate = useNavigate()
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<QuizFormData>({
    resolver: zodResolver(QuizSchema),
  })

  useEffect(() => {
    if (!quiz) return
    form.reset({
      title: quiz.title,
      description: quiz.description,
      hasLimit: quiz.hasLimit,
      limitMinutes: quiz.limitMinutes ?? undefined,
    })
  }, [quiz, form])

  const onSubmit = async (data: QuizFormData) => {
    if (!userId || !quizId) return
    setLoadingUpdate(true)
    setError(null)
    try {
      await updateQuiz(userId, quizId, buildQuiz(data))
      navigate(-1)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al guardar los datos del cuestionario'))
    } finally {
      setLoadingUpdate(false)
    }
  }

  return { form, onSubmit, quiz, loadingQuiz, loadingUpdate, error }
}
