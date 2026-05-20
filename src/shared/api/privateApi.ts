import axios from 'axios'
import { getSessionStorage, clearSessionStorage } from '../utils/session'
import { API_TIMEOUT } from '../constants/constants'
import { router } from '../../app/routes/router'
import { PATHS } from '../../app/routes/paths'

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: API_TIMEOUT,
})

privateApi.interceptors.request.use((config) => {
  const { token, validUntil } = getSessionStorage()

  if (!token || !validUntil || new Date(validUntil) <= new Date()) {
    clearSessionStorage()
    router.navigate(PATHS.home.root)
    return Promise.reject('Token expirado')
  }

  config.headers.Authorization = `Bearer ${token}`
  return config
})

privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearSessionStorage()
      router.navigate(PATHS.home.root)
    }
    return Promise.reject(error)
  }
)
