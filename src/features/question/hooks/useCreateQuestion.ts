import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { QuestionSchema, type QuestionFormData } from '../schemas/questionSchema'
import { createQuestion } from '../services/questionApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { QuestionType, type QuestionCreate } from '../types/question'
import { OPTION_CODES } from '../constants/questionConstants'

const buildQuestion = (data: QuestionFormData, order: number): QuestionCreate => ({
  statement: data.statement,
  type: data.type,
  baseCode: data.baseCode || null,
  order,
  score: data.score,
  options: data.type !== QuestionType.EDIT_CODE
    ? data.options.map((o, i) => ({ code: OPTION_CODES[i], value: o.value, isValid: o.isValid }))
    : null,
})

export const useCreateQuestion = (nextOrder: number, onSuccess: () => void) => {

  const { id: quizId } = useParams<{ id: string }>()
  const { userId } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      type: QuestionType.SINGLE_CHOICE,
      score: 10,
      statement: '',
      baseCode: '',
      options: [{ value: '', isValid: false }, { value: '', isValid: false }],
    },
  })

  const onSubmit = async (data: QuestionFormData) => {
    if (!userId || !quizId) return
    setLoading(true)
    setError(null)
    try {
      await createQuestion(userId, quizId, buildQuestion(data, nextOrder))
      onSuccess()
    } catch (err) {
      setError(getErrorMessage(err, 'Error al crear la pregunta'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error }
}
