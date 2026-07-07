import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { PartStatus } from '../../../features/participation/types/participation'
import { PATHS } from '../paths'

const ProtectedRouteUser = () => {

  const { isAuthUser, isAuthPart, part } = useAuth()
  
  if (isAuthUser) return <Outlet />
  if (isAuthPart && part) return <Navigate to={part.status === PartStatus.STARTED ? PATHS.part.answerQuiz(part.roomId, part.partId) : PATHS.part.ranking(part.roomId, part.partId)} replace />

  return <Navigate to={PATHS.auth.login} replace />
}

export default ProtectedRouteUser
