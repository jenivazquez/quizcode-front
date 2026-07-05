import { useState } from 'react'
import { useParams } from 'react-router-dom'
import type { UseFormReturn } from 'react-hook-form'
import { useAuth } from '../../../shared/hooks/useAuth'
import { generateQuestion } from '../services/questionApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import type { QuestionFormData } from '../schemas/questionSchema'
import type { Message, AIQuestion } from '../types/question'

const updateQuestionForm = (aiQuestion: AIQuestion, form: UseFormReturn<QuestionFormData>) => {
  if (aiQuestion.type != null) form.setValue('type', aiQuestion.type)
  if (aiQuestion.score != null) form.setValue('score', aiQuestion.score)
  if (aiQuestion.statement != null) form.setValue('statement', aiQuestion.statement)
  if (aiQuestion.baseCode != null) form.setValue('baseCode', aiQuestion.baseCode)
  if (aiQuestion.options != null) form.setValue('options', aiQuestion.options.map(o => ({ value: o.value, isValid: o.isValid })))
  if (aiQuestion.type === 'EDIT_CODE') form.setValue('options', [])
}

export const useAiChat = (form: UseFormReturn<QuestionFormData>) => {

  const { id: quizId } = useParams<{ id: string }>()
  const { userId } = useAuth()

  const [history, setHistory] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (userMessage: string) => {
    if (!userId || !quizId) return
    const newHistory: Message[] = [...history, { role: 'user', content: userMessage }]
    setHistory(newHistory)
    setLoading(true)
    setError(null)
    try {
      const aiQuestion = await generateQuestion(userId, quizId, newHistory)
      updateQuestionForm(aiQuestion, form)
      setHistory(prev => [...prev, { role: 'assistant', content: JSON.stringify(aiQuestion) }])
    } catch (err) {
      setError(getErrorMessage(err, 'Error al generar la pregunta'))
      setHistory(prev => prev.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  const messages = history.map(msg => {
    return (msg.role === 'assistant') 
      ? { role: 'assistant' as const, text: (JSON.parse(msg.content) as AIQuestion).message }
      :{ role: 'user' as const, text: msg.content }
  })

  return { messages, loading, error, onSubmit }
}
