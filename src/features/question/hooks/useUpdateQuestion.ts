import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { QuestionSchema, type QuestionFormData } from '../schemas/questionSchema'
import { updateQuestion } from '../services/questionApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { QuestionType, type QuestionDetail, type QuestionUpdate } from '../types/question'
import { OPTION_CODES } from '../constants/questionConstants'

const buildPayload = (data: QuestionFormData, order: number): QuestionUpdate => ({
  statement: data.statement,
  type: data.type,
  baseCode: data.baseCode || null,
  order,
  score: data.score,
  options: data.type !== QuestionType.EDIT_CODE
    ? data.options.map((o, i) => ({ code: OPTION_CODES[i], value: o.value, isValid: o.isValid }))
    : null,
})

export const useUpdateQuestion = (question: QuestionDetail, onSuccess: () => void) => {

  const { quizId } = useParams<{ quizId: string }>()
  const { userId } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      type: question.type,
      score: question.score,
      statement: question.statement,
      baseCode: question.baseCode ?? '',
      options: question.options?.map(o => ({ value: o.value, isValid: o.isValid })) ?? [],
    },
  })

  const onSubmit = async (data: QuestionFormData) => {
    if (!userId || !quizId) return
    setLoading(true)
    setError(null)
    try {
      await updateQuestion(userId, quizId, question.id, buildPayload(data, question.order))
      onSuccess()
    } catch (err) {
      setError(getErrorMessage(err, 'Error al guardar la pregunta'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error }
}
