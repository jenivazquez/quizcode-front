import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { createPart } from '../services/participationApi'
import { useAuth } from '../../../shared/hooks/useAuth'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { CreatePartSchema } from '../schemas/createPartSchema'
import { PATHS } from '../../../app/routes/paths'
import { PartStatus } from '../types/participation'
import type { CreatePartFormData } from '../schemas/createPartSchema'
import type { PartCreate } from '../types/participation'

const buildPart = (data: CreatePartFormData): PartCreate => ({
  username: data.username,
  password: data.password,
})

export const useCreatePart = () => {

  const { roomId } = useParams<{ roomId: string }>()
  const { saveSessionPart } = useAuth()

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
      const { id: partId, token, validUntil } = await createPart(roomId, buildPart(data))
      saveSessionPart(roomId, partId, token, validUntil, PartStatus.STARTED)
      navigate(PATHS.part.answerQuiz(roomId, partId))
    } catch (err) {
      setError(getErrorMessage(err, 'Error al registrarse en la sala'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error }
}
