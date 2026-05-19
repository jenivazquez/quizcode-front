import { createContext } from 'react'

export interface AuthContextType {
  isAuth: boolean;
  userId: string | null;
  saveSession: (token: string, validUntil: string, userId: string) => void;
  clearSession: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
