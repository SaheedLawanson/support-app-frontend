import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'

interface TokenResponse {
  accessToken: string
  refreshToken: string
}

const baseURL = import.meta.env.VITE_API_URL

export class BaseAPI {
  public axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({ baseURL })

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem('token')
        console.log('BaseAPI::token:', token)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        console.log('Request Config:', {
          url: config.url,
          method: config.method,
          baseURL: config.baseURL,
          headers: config.headers,
        })
        return config
      },
      (error) => {
        console.error('Request Interceptor Error:', error)
        return Promise.reject(error)
      },
    )

    this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      if (response?.data?.errors?.length > 0) {
        this.handleErrorResponse({ response })
      }
      console.log('Response Interceptor Success:', {
        status: response.status,
        data: response.data,
      })
      return response
    }, this.handleErrorResponse.bind(this))
  }

  public async handleErrorResponse(err: any): Promise<any> {
    const res = err.response as { data: { errors: { message: string }[] } }
    const router = useRouter()
    console.error('Response Error:', res.data)

    const apiErrors = res.data.errors.map((err) => err.message)
    console.log('apiErrors:', apiErrors)

    if (apiErrors.includes('Unauthorized') || apiErrors.includes('Invalid or Expired token')) {
      localStorage.removeItem('token')
      throw new Error('Token expired. Please login again.')
    }
    throw new Error(res.data.errors[0].message)
  }
}

export default BaseAPI
