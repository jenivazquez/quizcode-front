import type { PartStatus } from '../../features/participation/types/participation'

const KEYS = {
  token: 'partToken',
  validUntil: 'partValidUntil',
  roomId: 'partRoomId',
  partId: 'partId',
  status: 'partStatus',
} as const

export const setSessionStoragePart = (roomId: string, partId: string, token: string, validUntil: string, status: PartStatus) => {
  sessionStorage.setItem(KEYS.roomId, roomId)
  sessionStorage.setItem(KEYS.partId, partId)
  sessionStorage.setItem(KEYS.token, token)
  sessionStorage.setItem(KEYS.validUntil, validUntil)
  sessionStorage.setItem(KEYS.status, status)
}

export const setPartStatusStorage = (status: PartStatus) => {
  sessionStorage.setItem(KEYS.status, status)
}

export const clearSessionStoragePart = () => {
  sessionStorage.removeItem(KEYS.roomId)
  sessionStorage.removeItem(KEYS.partId)
  sessionStorage.removeItem(KEYS.token)
  sessionStorage.removeItem(KEYS.validUntil)
  sessionStorage.removeItem(KEYS.status)
}

export const getSessionStoragePart = () => ({
  roomId: sessionStorage.getItem(KEYS.roomId),
  partId: sessionStorage.getItem(KEYS.partId),
  token: sessionStorage.getItem(KEYS.token),
  validUntil: sessionStorage.getItem(KEYS.validUntil),
  status: sessionStorage.getItem(KEYS.status) as PartStatus | null,
})
