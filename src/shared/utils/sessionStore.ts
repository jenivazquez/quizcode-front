import { clearSessionStorage, setSessionStorage, getSessionStorage } from './session'

type Listener = () => void
const listeners = new Set<Listener>()
const notify = () => listeners.forEach((l) => l())

let _expired = false

export const sessionStore = {
  
  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },

  getIsAuth: (): boolean => {
    const { token, validUntil } = getSessionStorage()
    return Boolean(token && validUntil && new Date(validUntil) > new Date())
  },

  getUserId: (): string | null => getSessionStorage().userId,

  getToken: (): string | null => getSessionStorage().token,

  wasExpired: () => _expired,

  save: (token: string, validUntil: string, userId: string) => {
    _expired = false
    setSessionStorage(token, validUntil, userId)
    notify()
  },

  clear: (expired = false) => {
    _expired = expired
    clearSessionStorage()
    notify()
  },
}
