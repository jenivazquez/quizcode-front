import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { PATHS } from '../../app/routes/paths'

export const useLogout = () => {

  const { clearSession } = useAuth()
  const navigate = useNavigate()
  
  const logout = () => {
    clearSession()
    navigate(PATHS.auth.login)
  }

  return { logout }
}
