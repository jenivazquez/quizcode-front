import { clearSessionStorageUser, setSessionStorageUser, getSessionStorageUser } from './userSession'

type Listener = () => void
const listeners = new Set<Listener>()
const notify = () => listeners.forEach((l) => l())

let _expired = false

const notExpired = (validUntil: string | null): boolean => Boolean(validUntil && new Date(validUntil) > new Date())

export const userSessionStore = {

  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },

  getIsAuth: (): boolean => {
    const { token, validUntil } = getSessionStorageUser()
    return Boolean(token) && notExpired(validUntil)
  },

  getUserId: (): string | null => getSessionStorageUser().userId,

  getToken: (): string | null => getSessionStorageUser().token,

  wasExpired: () => _expired,

  save: (token: string, validUntil: string, userId: string) => {
    _expired = false
    setSessionStorageUser(token, validUntil, userId)
    notify()
  },

  clear: (expired = false) => {
    _expired = expired
    clearSessionStorageUser()
    notify()
  },
}
