import { setSessionStoragePart, setPartStatusStorage, getSessionStoragePart, clearSessionStoragePart } from './partSession'
import type { PartStatus } from '../../features/participation/types/participation'

type Listener = () => void
const listeners = new Set<Listener>()
const notify = () => listeners.forEach((l) => l())

type ClearReason = 'expired' | 'deleted'

let _clearReason: ClearReason | null = null

const notExpired = (validUntil: string | null): boolean => Boolean(validUntil && new Date(validUntil) > new Date())

export interface PartSession {
  roomId: string
  partId: string
  status: PartStatus
}

export const partSessionStore = {

  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },

  getIsAuth: (): boolean => {
    const { token, validUntil } = getSessionStoragePart()
    return Boolean(token) && notExpired(validUntil)
  },

  getRoomId: (): string | null => getSessionStoragePart().roomId,

  getPartId: (): string | null => getSessionStoragePart().partId,

  getStatus: (): PartStatus | null => getSessionStoragePart().status,

  getToken: (): string | null => getSessionStoragePart().token,

  wasExpired: () => _clearReason === 'expired',

  wasDeleted: () => _clearReason === 'deleted',

  save: (roomId: string, partId: string, token: string, validUntil: string, status: PartStatus) => {
    _clearReason = null
    setSessionStoragePart(roomId, partId, token, validUntil, status)
    notify()
  },

  updatePartStatus: (status: PartStatus) => {
    setPartStatusStorage(status)
    notify()
  },

  clear: (reason?: ClearReason) => {
    _clearReason = reason ?? null
    clearSessionStoragePart()
    notify()
  },
}
