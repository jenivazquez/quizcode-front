import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { UpdateUserSchema, type UpdateUserFormData } from '../schemas/updateUserSchema'
import { updateUser } from '../services/userApi'
import type { UserUpdate } from '../types/user'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { useDetailUser } from './useDetailUser'
import { PATHS } from '../../../app/routes/paths'
import { NAVIGATION_DELAY } from '../../../shared/constants/constants'

function buildUser(data: UpdateUserFormData): UserUpdate {
  return {
    name: data.name,
    surname1: data.surname1,
    surname2: data.surname2,
    password: data.password || undefined,
  }
}

export const useUpdateUser = () => {

  const { userId } = useAuth()
  const { user, loading: loadingUser, error: profileError } = useDetailUser()
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(UpdateUserSchema),
  })

  useEffect(() => {
    if (!user) return
    form.reset({
      name: user.name,
      surname1: user.surname1,
      surname2: user.surname2,
      password: '',
      repeatPassword: '',
    })
  }, [user, form])

  const onSubmit = async (data: UpdateUserFormData) => {
    if (!userId) return
    setLoadingEdit(true)
    setError(null)
    try {
      await updateUser(userId, buildUser(data))
      setSuccess(true)
      setTimeout(() => navigate(PATHS.profile), NAVIGATION_DELAY)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al actualizar el perfil'))
    } finally {
      setLoadingEdit(false)
    }
  }

  return { form, onSubmit, user, loadingUser, loadingEdit, error: error ?? profileError, success }
}
