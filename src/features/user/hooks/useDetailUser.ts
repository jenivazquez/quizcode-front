import { useState, useEffect } from 'react'
import { useAuth } from '../../../shared/hooks/useAuth'
import { findUserById } from '../services/userApi'
import { getErrorMessage } from '../../../shared/utils/getErrorMessage'
import { type UserDetail as User } from '../types/user'

export const useDetailUser = () => {
  
  const { userId } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    const findUser = async () => {
      if (!userId) return
      try {
        setUser(await findUserById(userId))
      } catch (err) {
        setError(getErrorMessage(err, 'Error al cargar el perfil'))
      } finally {
        setLoading(false)
      }
    }
    findUser()
  }, [userId])
  
  return { user, loading, error }
}
