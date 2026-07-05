import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { findPartById } from '../services/participationApi'
import type { QuizDetailToAnswer } from '../../quiz/types/quiz'

interface Params {
  quiz: QuizDetailToAnswer | null | undefined
  onExpire: () => void
}

export const useTimerPart = ({ quiz, onExpire }: Params) => {

  const { roomId, partId } = useParams<{ roomId: string, partId: string }>()

  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {

    if (!quiz || !quiz.hasLimit || !quiz.limitMinutes) return

    let intervalId: ReturnType<typeof setInterval>

    const initTimer = async () => {

      const limitSeconds = quiz.limitMinutes! * 60
      let startedAt: number
      try {
        const participation = await findPartById(roomId!, partId!)
        startedAt = new Date(participation.startedAt).getTime()
      } catch {
        startedAt = Date.now()
      }

      setTimeLeft(Math.max(0, limitSeconds - Math.floor((Date.now() - startedAt) / 1000)))

      intervalId = setInterval(() => {
        const remaining = Math.max(0, limitSeconds - Math.floor((Date.now() - startedAt) / 1000))
        setTimeLeft(remaining)
        if (remaining === 0) clearInterval(intervalId)
      }, 1000)
    }

    initTimer()

    return () => clearInterval(intervalId)

  }, [quiz]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (timeLeft !== 0) return
    onExpire()
  }, [timeLeft, onExpire])

  return { timeLeft }
}
