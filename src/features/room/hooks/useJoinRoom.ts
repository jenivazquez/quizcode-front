import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { findRoomByCode } from '../services/roomApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { JoinRoomSchema } from '../schemas/joinRoomSchema'
import { PATHS } from '../../../app/routes/paths'
import { RoomStatus } from '../types/room'
import type { JoinRoomFormData } from '../schemas/joinRoomSchema'

export const useJoinRoom = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const form = useForm<JoinRoomFormData>({
    resolver: zodResolver(JoinRoomSchema),
  })

  const onSubmit = async (data: JoinRoomFormData) => {
    const codeUpperCase = data.code.trim().toUpperCase()
    setLoading(true)
    setError(null)
    try {
      const room = await findRoomByCode(codeUpperCase)
      navigate(room.status === RoomStatus.OPENED ? PATHS.part.create(room.id) : PATHS.part.login(room.id))
    } catch (err) {
      setError(getErrorMessage(err, 'No existe ninguna sala con ese código'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error }
}
