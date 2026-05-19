import axios from 'axios'
import { API_TIMEOUT } from '../constants/constants'

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: API_TIMEOUT,
})
