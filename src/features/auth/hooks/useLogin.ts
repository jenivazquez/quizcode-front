import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { login as loginApi } from '../services/authApi'
import { LoginSchema, type LoginFormData } from '../schemas/loginSchema'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { PATHS } from '../../../app/routes/paths'

export const useLogin = () => {
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { saveSessionUser } = useAuth()
  const navigate = useNavigate()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError(null)
    try {
      const auth = await loginApi(data.email, data.password)
      saveSessionUser(auth.token, auth.validUntil, auth.userId)
      navigate(PATHS.quiz.list)
    } catch (err) {
      setError(getErrorMessage(err, 'Email o contraseña incorrectos'))
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, error }
}