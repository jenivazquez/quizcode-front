import axios from 'axios'
import { partSessionStore } from '../session/partSessionStore'
import { API_TIMEOUT } from '../constants/constants'

export const privateApiPart = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: API_TIMEOUT,
})

privateApiPart.interceptors.request.use(
  (config) => {
    if (!partSessionStore.getIsAuth()) {
      partSessionStore.clear('expired')
      return Promise.reject('Sesión de participación expirada')
    }
    config.headers.Authorization = `Bearer ${partSessionStore.getToken()}`
    return config
  })

privateApiPart.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      partSessionStore.clear('expired')
    }
    return Promise.reject(error)
  }
)
