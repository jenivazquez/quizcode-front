import { useSyncExternalStore } from 'react'
import { AuthContext } from './AuthContext'
import { userSessionStore } from '../session/userSessionStore'
import { partSessionStore } from '../session/partSessionStore'
import type { PartSession } from '../session/partSessionStore'
import type { PartStatus } from '../../features/participation/types/participation'

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const isAuthUser = useSyncExternalStore(userSessionStore.subscribe, userSessionStore.getIsAuth)
  const isAuthPart = useSyncExternalStore(partSessionStore.subscribe, partSessionStore.getIsAuth)

  const userId = useSyncExternalStore(userSessionStore.subscribe, userSessionStore.getUserId)
  const roomId = useSyncExternalStore(partSessionStore.subscribe, partSessionStore.getRoomId)
  const partId = useSyncExternalStore(partSessionStore.subscribe, partSessionStore.getPartId)
  const status = useSyncExternalStore(partSessionStore.subscribe, partSessionStore.getStatus)
  const part: PartSession | null = roomId && partId && status ? { roomId, partId, status } : null

  const clearSessionUser = () => userSessionStore.clear()
  const clearSessionPart = () => partSessionStore.clear()

  const saveSessionUser = (token: string, validUntil: string, userId: string) => {
    userSessionStore.save(token, validUntil, userId)
  }
  const saveSessionPart = (roomId: string, partId: string, token: string, validUntil: string, status: PartStatus) => {
    partSessionStore.save(roomId, partId, token, validUntil, status)
  }

  const updateStatusPart = (status: PartStatus) => partSessionStore.updatePartStatus(status)

  return (
    <AuthContext.Provider value={{ isAuthUser, userId, saveSessionUser, clearSessionUser, part, isAuthPart, saveSessionPart, updateStatusPart, clearSessionPart }}>
      {children}
    </AuthContext.Provider>
  )
}
