import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'
import { PATHS } from './paths'

const GuestRoute = () => {
  const { isAuth } = useAuth()
  return isAuth ? <Navigate to={PATHS.quiz.list} replace /> : <Outlet />
}

export default GuestRoute
