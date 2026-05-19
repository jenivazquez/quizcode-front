import { type AuthResponse } from './authResponse'
import { type AuthToken } from '../types/authToken'
import { publicApi } from '../../../shared/api/publicApi'

export async function login(email: string, password: string): Promise<AuthToken> {
  const response = await publicApi.post<AuthResponse>('/token', { email, password })
  return { ...response.data }
}
