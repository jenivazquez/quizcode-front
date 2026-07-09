import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { submitAnswers } from '../services/participationApi'
import { useAuth } from '../../../shared/hooks/useAuth'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { getErrorStatus } from '../../../shared/utils/getErrorStatus'
import { partSessionStore } from '../../../shared/session/partSessionStore'
import { PATHS } from '../../../app/routes/paths'
import { QuestionType } from '../../question/types/question'
import { PartStatus } from '../types/participation'
import type { QuestionDetail } from '../../question/types/question'
import type { AnswerSubmit } from '../types/participation'

const buildEmptyAnswer = (question: QuestionDetail): AnswerSubmit => ({
  questionId: question.id,
  codeOptions: question.type === QuestionType.EDIT_CODE ? null : [],
  writtenAnswer: question.type === QuestionType.EDIT_CODE ? question.baseCode ?? '' : null,
})

export const useSubmitAnswers = (questions: QuestionDetail[]) => {

  const { roomId, partId } = useParams<{ roomId: string, partId: string }>()
  const navigate = useNavigate()
  const { updateStatusPart } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, AnswerSubmit>>({})

  useEffect(() => {
    if (questions.length === 0) return
    setAnswers(Object.fromEntries(questions.map(question => [question.id, buildEmptyAnswer(question)])))
  }, [questions])

  const handleAnswer = (questionId: string, type: QuestionType, value: string) => {
    setAnswers(currentAnswers => {
      if (type === QuestionType.EDIT_CODE) {
        return { ...currentAnswers, [questionId]: { questionId, codeOptions: null, writtenAnswer: value } }
      } else if (type === QuestionType.SINGLE_CHOICE) {
        return { ...currentAnswers, [questionId]: { questionId, codeOptions: [value], writtenAnswer: null } }
      } else {
        const currentOptions = currentAnswers[questionId]?.codeOptions ?? []
        const newOptions = currentOptions.includes(value) ? currentOptions.filter(opt => opt !== value) : [...currentOptions, value]
        return { ...currentAnswers, [questionId]: { questionId, codeOptions: newOptions, writtenAnswer: null } }
      }
    })
  }

  const onSubmit = async (redirect = true) => {
    if (!roomId || !partId) return
    setLoading(true)
    setError(null)
    try {
      await submitAnswers(roomId, partId, Object.values(answers))
      updateStatusPart(PartStatus.FINISHED)
      if (redirect) navigate(PATHS.part.ranking(roomId, partId))
    } catch (err) {
      if (getErrorStatus(err) === 404) { partSessionStore.clear('deleted') }
      setError(getErrorMessage(err, 'Error al enviar las respuestas'))
      setLoading(false)
    }
  }

  return { answers, handleAnswer, onSubmit, loading, error }
}
