import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateRoomSchema, type CreateRoomFormData } from '../schemas/createRoomSchema'
import { createRoom } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useAuth } from '../../../shared/hooks/useAuth'
import type { RoomCreate } from '../types/room'

function buildRoom(data: CreateRoomFormData): RoomCreate {
  return {
    name: data.name, 
    description: data.description
  }
}

export const useCreateRoom = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { userId } = useAuth()

  const { quizId } = useParams<{ quizId: string }>()

  const form = useForm<CreateRoomFormData>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: { quizId: quizId ?? '' },
  })

  const onSubmit = async (data: CreateRoomFormData) => {
    if (!userId) return
    setLoading(true)
    setError(null)
    try {
      await createRoom(userId, data.quizId, buildRoom(data))
      navigate(-1)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al crear la sala'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error }
}
