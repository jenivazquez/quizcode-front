import { useState, useEffect } from 'react'
import { findRoomByIdToAnswer } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import type { RoomDetail } from '../types/room'
import { useParams } from 'react-router-dom'

export const useDetailRoomToAnswer = () => {

  const { roomId } = useParams<{ roomId: string}>()

  const [room, setRoom] = useState<RoomDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!roomId) return
    const findRoom = async () => {
      setLoading(true)
      setError(null)
      try {
        setRoom(await findRoomByIdToAnswer(roomId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar la sala'))
      } finally {
        setLoading(false)
      }
    }
    findRoom()
  }, [roomId])

  return { room, loading, error }
}
