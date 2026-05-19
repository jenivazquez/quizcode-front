import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'
import { PATHS } from './paths'

const ProtectedRoute = () => {
  const { isAuth } = useAuth()
  return isAuth ? <Outlet /> : <Navigate to={PATHS.home} replace />
}

export default ProtectedRoute
