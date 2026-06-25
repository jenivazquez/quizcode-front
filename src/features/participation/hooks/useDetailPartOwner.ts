import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { findPartByIdAsOwner } from '../services/participationApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import type { PartDetail } from '../types/participation'

export const useDetailPartOwner = () => {

  const { quizId, roomId, partId } = useParams<{ quizId: string, roomId: string, partId: string }>()
  const { userId } = useAuth()

  const [part, setPart] = useState<PartDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)

  const refreshPart = () => setRefresh(k => k + 1)

  useEffect(() => {
    if (!userId || !quizId || !roomId || !partId) return
    const findPart = async () => {
      try {
        setPart(await findPartByIdAsOwner(userId, quizId, roomId, partId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar la participación'))
      } finally {
        setLoading(false)
      }
    }
    findPart()
  }, [userId, quizId, roomId, partId, refresh])

  return { part, loading, error, refreshPart }
}
