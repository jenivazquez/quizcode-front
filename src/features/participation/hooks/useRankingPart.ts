import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { findPartsRanking } from '../services/participationApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { getErrorStatus } from '../../../shared/utils/getErrorStatus'
import { partSessionStore } from '../../../shared/session/partSessionStore'
import { INTERVAL_RANKING_MS } from '../constants/participationConstants'
import type { PartRankingDetail } from '../types/participation'

export const useRankingPart = (autoLoop = true) => {

  const { roomId, partId } = useParams<{ roomId: string, partId: string }>()

  const [ranking, setRanking] = useState<PartRankingDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!roomId || !partId) return
    let intervalId: ReturnType<typeof setInterval> | undefined = undefined
    const findRanking = async () => {
      try {
        setRanking(await findPartsRanking(roomId))
      } catch (err) {
        if (getErrorStatus(err) === 404) { clearInterval(intervalId); partSessionStore.clear('deleted') }
        setError(getErrorMessage(err, 'Error al cargar el ranking'))
      } finally {
        setLoading(false)
      }
    }
    findRanking()
    if (!autoLoop) return
    intervalId = setInterval(findRanking, INTERVAL_RANKING_MS)
    return () => clearInterval(intervalId)
  }, [roomId, partId, autoLoop])

  return { ranking, loading, error }
}
