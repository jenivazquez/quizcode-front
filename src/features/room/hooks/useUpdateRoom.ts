import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { UpdateRoomSchema, type UpdateRoomFormData } from '../schemas/updateRoomSchema'
import { updateRoom } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useDetailRoom } from './useDetailRoom'
import type { RoomUpdate } from '../types/room'

const buildRoom = (data: UpdateRoomFormData): RoomUpdate => ({
  name: data.name, 
  description: data.description
})

export const useUpdateRoom = () => {

  const { userId } = useAuth()
  const { quizId, roomId } = useParams<{ quizId: string, roomId: string }>()

  const { room, loading: loadingRoom } = useDetailRoom()
  const navigate = useNavigate()
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<UpdateRoomFormData>({
    resolver: zodResolver(UpdateRoomSchema),
  })

  useEffect(() => {
    if (!room) return
    form.reset({ 
      name: room.name, 
      description: room.description 
    })
  }, [room, form])

  const onSubmit = async (data: UpdateRoomFormData) => {
    if (!userId || !quizId || !roomId) return
    setLoadingUpdate(true)
    setError(null)
    try {
      await updateRoom(userId, quizId, roomId, buildRoom(data))
      navigate(-1)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al guardar los datos de la sala'))
    } finally {
      setLoadingUpdate(false)
    }
  }

  return { form, onSubmit, room, loadingRoom, loadingUpdate, error }
}
