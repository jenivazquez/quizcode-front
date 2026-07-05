import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { findPartsByRoomAsOwner } from '../services/participationApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { INTERVAL_RANKING_MS } from '../constants/participationConstants'
import type { PartDetail } from '../types/participation'

export const useListPartOwner = (autoLoop = false) => {

  const { quizId, roomId } = useParams<{ quizId: string, roomId: string }>()
  const { userId } = useAuth()

  const [parts, setParts] = useState<PartDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)

  const refreshParts = () => setRefresh(k => k + 1)

  useEffect(() => {

    if (!userId || !quizId || !roomId) return
    const findParts = async () => {
      try {
        setParts(await findPartsByRoomAsOwner(userId, quizId, roomId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar las participaciones'))
      } finally {
        setLoading(false)
      }
    }
    findParts()
    
    if (!autoLoop) return
    const interval = setInterval(findParts, INTERVAL_RANKING_MS)
    return () => clearInterval(interval)

  }, [userId, quizId, roomId, autoLoop, refresh])

  return { parts, loading, error, refreshParts }
}
