import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { CreateUserSchema, type CreateUserFormData } from '../schemas/createUserSchema'
import { createUser } from '../services/userApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { PATHS } from '../../../app/routes/paths'

export const useCreateUser = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
      navigate(PATHS.login)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al crear el usuario'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error }
}
