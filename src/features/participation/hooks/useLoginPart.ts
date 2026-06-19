import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { loginPart } from '../services/participationApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { LoginPartSchema } from '../schemas/loginPartSchema'
import { PartStatus } from '../types/participation'
import { PATHS } from '../../../app/routes/paths'
import type { LoginPartFormData } from '../schemas/loginPartSchema'
import type { PartLogin } from '../types/participation'

function buildPart(data: LoginPartFormData): PartLogin {
  return {
    username: data.username,
    password: data.password,
  }
}

export const useLoginPart = () => {

  const { roomId } = useParams<{ roomId: string }>()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const form = useForm<LoginPartFormData>({
    resolver: zodResolver(LoginPartSchema),
  })

  const onSubmit = async (data: LoginPartFormData) => {
    if (!roomId) return
    setLoading(true)
    setError(null)
    try {
      const { id: partId, status } = await loginPart(roomId, buildPart(data))
      navigate(status === PartStatus.STARTED ? PATHS.part.answerQuiz(roomId, partId) : PATHS.part.ranking(roomId, partId))
    } catch (err) {
      setError(getErrorMessage(err, 'Error al iniciar sesión'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error }
}
