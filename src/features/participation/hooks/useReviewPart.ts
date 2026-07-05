import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { reviewPartAsOwner } from '../services/participationApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import type { QuestionDetail } from '../../question/types/question'
import type { AnswerReview, PartDetail } from '../types/participation'

export const useReviewPart = (questions: QuestionDetail[], part: PartDetail | null) => {

  const { quizId, roomId, partId } = useParams<{ quizId: string, roomId: string, partId: string }>()
  const { userId } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [reviewData, setReviewData] = useState<AnswerReview[]>([])

  const initEdit = () => {
    if (!part) return
    setReviewData(
      questions.map(question => {
        const answer = part.answers.find(answer => answer.questionId === question.id)
        return {
          questionId: question.id,
          isCorrect: answer?.isCorrect ?? false,
          score: answer?.score ?? 0,
          feedback: answer?.feedback ?? '',
        }
      })
    )
    setIsEditing(true)
  }

  const updateField = (questionId: string, field: keyof AnswerReview, value: unknown) => {
    setReviewData(current => current.map(data => data.questionId === questionId ? { ...data, [field]: value } : data))
  }

  const onSubmit = async () => {
    if (!userId || !quizId || !roomId || !partId) return
    setLoading(true)
    setError(null)
    try {
      await reviewPartAsOwner(userId, quizId, roomId, partId, reviewData)
      setIsEditing(false)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al guardar la revisión'))
    } finally {
      setLoading(false)
    }
  }

  const onCancel = () => setIsEditing(false)

  return { isEditing, reviewData, initEdit, onCancel, updateField, onSubmit, loading, error }
}
