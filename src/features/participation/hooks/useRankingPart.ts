import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { findPartsRanking } from '../services/participationApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { INTERVAL_RANKING_MS } from '../constants/participationConstants'
import type { PartRankingDetail } from '../types/participation'

export const useRankingPart = (autoLoop = true) => {

  const { roomId } = useParams<{ roomId: string }>()

  const [ranking, setRanking] = useState<PartRankingDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!roomId) return
    const findRanking = async () => {
      try {
        setRanking(await findPartsRanking(roomId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar el ranking'))
      } finally {
        setLoading(false)
      }
    }
    findRanking()
    if (!autoLoop) return
    const interval = setInterval(findRanking, INTERVAL_RANKING_MS)
    return () => clearInterval(interval)
  }, [roomId, autoLoop])

  return { ranking, loading, error }
}
