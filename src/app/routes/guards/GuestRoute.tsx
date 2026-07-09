import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { PartStatus } from '../../../features/participation/types/participation'
import { PATHS } from '../paths'

const GuestRoute = () => {

  const { isAuthUser, isAuthPart, part } = useAuth()

  if (isAuthUser) return <Navigate to={PATHS.quiz.list} replace />
  if (isAuthPart && part) return <Navigate to={part.status === PartStatus.STARTED ? PATHS.part.answerQuiz(part.roomId, part.partId) : PATHS.part.ranking(part.roomId, part.partId)} replace />
  
  return <Outlet />
  
}

export default GuestRoute
