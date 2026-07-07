import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { PATHS } from '../../app/routes/paths'

export const useLogoutPart = () => {

  const { clearSessionPart } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    clearSessionPart()
    navigate(PATHS.home.root)
  }

  return { logout }
}
