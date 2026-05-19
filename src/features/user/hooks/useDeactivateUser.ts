import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { deactivateUser } from '../services/userApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { PATHS } from '../../../app/routes/paths'

export const useDeactivateUser = () => {
  const { userId, clearSession } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deactivate = async () => {
    if (!userId) return
    setLoading(true)
    setError(null)
    try {
      await deactivateUser(userId)
      clearSession()
      navigate(PATHS.home)
    } catch (err) {
      setError(getErrorMessage(err, 'Error al desactivar la cuenta'))
    } finally {
      setLoading(false)
    }
  }

  return { deactivate, loading, error }
}
