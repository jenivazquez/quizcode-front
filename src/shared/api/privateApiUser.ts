import axios from 'axios'
import { userSessionStore } from '../session/userSessionStore'
import { API_TIMEOUT } from '../constants/constants'

export const privateApiUser = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: API_TIMEOUT,
})

privateApiUser.interceptors.request.use(
  (config) => {
    if (!userSessionStore.getIsAuth()) {
      userSessionStore.clear(true)
      return Promise.reject('Sesión de usuario expirada')
    }
    config.headers.Authorization = `Bearer ${userSessionStore.getToken()}`
    return config
  })

privateApiUser.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      userSessionStore.clear(true)
    }
    return Promise.reject(error)
  }
)
