import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { PATHS } from '../../app/routes/paths'

export const useLogoutUser = () => {

  const { clearSessionUser } = useAuth()
  const navigate = useNavigate()
  
  const logout = () => {
    clearSessionUser()
    navigate(PATHS.home.root)
  }

  return { logout }
}
