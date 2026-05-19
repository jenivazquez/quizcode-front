import { useState } from 'react'
import { AuthContext } from './AuthContext'
import { setSessionStorage, clearSessionStorage, getSessionStorage } from '../utils/session'

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const getInitialAuth = () => {
    const { token, validUntil, userId } = getSessionStorage()
    if (token && validUntil && new Date(validUntil) > new Date()) {
      return { isAuth: true, userId }
    } else {
      clearSessionStorage()
      return { isAuth: false, userId }
    }
  }

  const [auth, setAuth] = useState(getInitialAuth)

  const clearSession = () => {
    clearSessionStorage()
    setAuth({ isAuth: false, userId: null })
  }

  const saveSession = (token: string, validUntil: string, userId: string) => {
    setSessionStorage(token, validUntil, userId)
    setAuth({ isAuth: true, userId })
  }

  return (
    <AuthContext.Provider value={{ isAuth: auth.isAuth, userId: auth.userId, saveSession, clearSession }}>
      {children}
    </AuthContext.Provider>
  )
}
