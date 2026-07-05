import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { findPartById } from '../services/participationApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import type { PartDetail } from '../types/participation'

export const useDetailPart = () => {

  const { roomId, partId } = useParams<{ roomId: string, partId: string }>()

  const [part, setPart] = useState<PartDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!roomId || !partId) return
    const findPart = async () => {
      setLoading(true)
      setError(null)
      try {
        setPart(await findPartById(roomId, partId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar la participación'))
      } finally {
        setLoading(false)
      }
    }
    findPart()
  }, [roomId, partId])

  return { part, loading, error }
}
