import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateRoomStatus } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import { RoomStatus } from '../types/room'

export const useStateRoom = () => {

  const { quizId, roomId } = useParams<{ quizId: string, roomId: string }>()
  const { userId } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeStatus = async (status: RoomStatus) => {
    if (!userId || !quizId || !roomId) return
    setLoading(true)
    setError(null)
    try {
      await updateRoomStatus(userId, quizId, roomId, status)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al cambiar el estado de la sala'))
    } finally {
      setLoading(false)
    }
  }

  const open   = () => changeStatus(RoomStatus.OPENED)
  const pause  = () => changeStatus(RoomStatus.PAUSED)
  const reopen = () => changeStatus(RoomStatus.OPENED)
  const close  = () => changeStatus(RoomStatus.CLOSED)

  return { open, pause, reopen, close, loading, error }
}
