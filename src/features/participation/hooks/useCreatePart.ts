import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { createPart } from '../services/participationApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { CreatePartSchema } from '../schemas/createPartSchema'
import { PATHS } from '../../../app/routes/paths'
import type { CreatePartFormData } from '../schemas/createPartSchema'
import type { PartCreate } from '../types/participation'

function buildPart(data: CreatePartFormData): PartCreate {
  return {
    username: data.username,
    password: data.password,
  }
}

export const useCreatePart = () => {

  const { roomId } = useParams<{ roomId: string }>()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const form = useForm<CreatePartFormData>({
    resolver: zodResolver(CreatePartSchema),
  })

  const onSubmit = async (data: CreatePartFormData) => {
    if (!roomId) return
    setLoading(true)
    setError(null)
    try {
      const partId = await createPart(roomId, buildPart(data))
      navigate(PATHS.part.answerQuiz(roomId, partId))
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Error al registrarse en la sala'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error }
}
