import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import { PartStatus } from '../../../features/participation/types/participation'
import { PATHS } from '../paths'

const ProtectedRoutePart = () => {

  const { isAuthUser, isAuthPart, part } = useAuth()
  const { partId } = useParams<{ roomId: string, partId: string }>()

  if (isAuthUser) return <Navigate to={PATHS.quiz.list} replace />
  if (!isAuthPart || !part) return <Navigate to={PATHS.room.join} replace />
  if (part.partId !== partId) return <Navigate to={part.status === PartStatus.STARTED ? PATHS.part.answerQuiz(part.roomId, part.partId) : PATHS.part.ranking(part.roomId, part.partId)} replace />

  return <Outlet />
  
}

export default ProtectedRoutePart
