import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { QuizSchema, type QuizFormData } from '../schemas/quizSchema'
import { createQuiz } from '../services/quizApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import { PATHS } from '../../../app/routes/paths'
import type { QuizCreate } from '../types/quiz'

function buildQuiz(data: QuizFormData): QuizCreate {
  return {
    title: data.title,
    description: data.description,
    hasLimit: data.hasLimit,
    limitMinutes: data.hasLimit ? data.limitMinutes ?? null : null,
  }
}

export const useCreateQuiz = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { userId } = useAuth()

  const form = useForm<QuizFormData>({
    resolver: zodResolver(QuizSchema),
    defaultValues: { hasLimit: false, limitMinutes: null}
  })

  const hasLimit = form.watch('hasLimit')

  const onSubmit = async (data: QuizFormData) => {
    if (!userId) return
    setLoading(true)
    setError(null)
    try {
      await createQuiz(userId, buildQuiz(data))
      navigate(PATHS.list)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al crear el quiz'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error, hasLimit }
}
