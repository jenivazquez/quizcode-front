import { createContext } from 'react'
import type { PartSession } from '../session/partSessionStore'
import type { PartStatus } from '../../features/participation/types/participation'

export interface AuthContextType {
  isAuthUser: boolean;
  userId: string | null;
  saveSessionUser: (token: string, validUntil: string, userId: string) => void;
  clearSessionUser: () => void;
  part: PartSession | null;
  isAuthPart: boolean;
  saveSessionPart: (roomId: string, partId: string, token: string, validUntil: string, status: PartStatus) => void;
  updateStatusPart: (status: PartStatus) => void;
  clearSessionPart: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
