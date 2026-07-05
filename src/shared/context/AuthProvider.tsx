import { useSyncExternalStore } from 'react'
import { AuthContext } from './AuthContext'
import { sessionStore } from '../utils/sessionStore'

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const isAuth = useSyncExternalStore(sessionStore.subscribe, sessionStore.getIsAuth)
  const userId = useSyncExternalStore(sessionStore.subscribe, sessionStore.getUserId)

  const clearSession = () => sessionStore.clear()

  const saveSession = (token: string, validUntil: string, userId: string) => {
    sessionStore.save(token, validUntil, userId)
  }

  return (
    <AuthContext.Provider value={{ isAuth, userId, saveSession, clearSession }}>
      {children}
    </AuthContext.Provider>
  )
}
