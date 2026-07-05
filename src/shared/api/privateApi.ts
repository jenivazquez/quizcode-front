import axios from 'axios'
import { sessionStore } from '../utils/sessionStore'
import { API_TIMEOUT } from '../constants/constants'

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: API_TIMEOUT,
})

privateApi.interceptors.request.use(
  (config) => {
    if (!sessionStore.getIsAuth()) {
      sessionStore.clear(true)
      return Promise.reject('Token expirado')
    }
    config.headers.Authorization = `Bearer ${sessionStore.getToken()}`
    return config
  })

privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStore.clear(true)
    }
    return Promise.reject(error)
  }
)
