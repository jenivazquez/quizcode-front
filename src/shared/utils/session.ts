const KEYS = {
  token: 'token',
  validUntil: 'validUntil',
  userId: 'userId',
} as const

export const setSessionStorage = (token: string, validUntil: string, userId: string) => {
  sessionStorage.setItem(KEYS.token, token)
  sessionStorage.setItem(KEYS.validUntil, validUntil)
  sessionStorage.setItem(KEYS.userId, userId)
}

export const clearSessionStorage = () => {
  sessionStorage.removeItem(KEYS.token)
  sessionStorage.removeItem(KEYS.validUntil)
  sessionStorage.removeItem(KEYS.userId)
}

export const getSessionStorage = () => ({
  token: sessionStorage.getItem(KEYS.token),
  validUntil: sessionStorage.getItem(KEYS.validUntil),
  userId: sessionStorage.getItem(KEYS.userId),
})
