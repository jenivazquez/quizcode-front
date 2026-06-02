import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { findRoomByCode } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { JoinRoomSchema } from '../schemas/joinRoomSchema'
import type { JoinRoomFormData } from '../schemas/joinRoomSchema'

export const useJoinRoom = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<JoinRoomFormData>({
    resolver: zodResolver(JoinRoomSchema),
  })

  const onSubmit = async (data: JoinRoomFormData) => {
    const codeUpperCase = data.code.trim().toUpperCase()
    setLoading(true)
    setError(null)
    try {
      await findRoomByCode(codeUpperCase)
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'No existe ninguna sala con ese código'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error }
}
