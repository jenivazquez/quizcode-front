const KEYS = {
  token: 'userToken',
  validUntil: 'userValidUntil',
  userId: 'userId',
} as const

export const setSessionStorageUser = (token: string, validUntil: string, userId: string) => {
  sessionStorage.setItem(KEYS.token, token)
  sessionStorage.setItem(KEYS.validUntil, validUntil)
  sessionStorage.setItem(KEYS.userId, userId)
}

export const clearSessionStorageUser = () => {
  sessionStorage.removeItem(KEYS.token)
  sessionStorage.removeItem(KEYS.validUntil)
  sessionStorage.removeItem(KEYS.userId)
}

export const getSessionStorageUser = () => ({
  token: sessionStorage.getItem(KEYS.token),
  validUntil: sessionStorage.getItem(KEYS.validUntil),
  userId: sessionStorage.getItem(KEYS.userId),
})
