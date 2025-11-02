const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export interface SignupData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface ApiResponse<T> {
  status: string
  data?: T
  message?: string
}

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchWithCredentials(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An error occurred',
    }))
    // Handle backend error response format: { status: 'fail', message: '...' }
    const errorMessage = error.message || error.status || `Request failed with status ${response.status}`
    throw new ApiError(errorMessage, response.status)
  }

  return response
}

export const authApi = {
  async signup(data: SignupData): Promise<ApiResponse<{ user: User }>> {
    const response = await fetchWithCredentials('/user/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async login(data: LoginData): Promise<ApiResponse<{ user: User }>> {
    const response = await fetchWithCredentials('/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async logout(): Promise<ApiResponse<void>> {
    const response = await fetchWithCredentials('/user/logout', {
      method: 'GET',
    })
    return response.json()
  },
}

export { ApiError }

