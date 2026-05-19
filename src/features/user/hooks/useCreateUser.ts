import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { CreateUserSchema, type CreateUserFormData } from '../schemas/createUserSchema'
import { createUser } from '../services/userApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { PATHS } from '../../../app/routes/paths'
import { NAVIGATION_DELAY } from '../../../shared/constants/constants'

export const useCreateUser = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(CreateUserSchema),
  })

  const onSubmit = async (data: CreateUserFormData) => {
    setLoading(true)
    setError(null)
    try {
      const { repeatPassword, ...userCreate } = data
      await createUser(userCreate)
      setSuccess(true)
      setTimeout(() => navigate(PATHS.login), NAVIGATION_DELAY)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al crear el usuario'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error, success }
}
