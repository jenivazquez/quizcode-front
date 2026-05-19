import { type UserResponse } from './userResponse'
import { privateApi } from '../../../shared/api/privateApi'
import { publicApi } from '../../../shared/api/publicApi'
import { type UserDetail, type UserCreate, type UserUpdate } from '../types/user'

export async function createUser(user: UserCreate): Promise<void> {
  await publicApi.post('/user', user)
}

export async function updateUser(userId: string, user: UserUpdate): Promise<void> {
  await privateApi.patch(`/user/${userId}`, user)
}

export async function findUserById(userId: string): Promise<UserDetail> {
  const response = await privateApi.get<UserResponse>(`/user/${userId}`)
  return { ...response.data }
}

export async function deactivateUser(userId: string): Promise<void> {
  const body = { active: false }
  await privateApi.patch(`/user/${userId}/status`, body)
}