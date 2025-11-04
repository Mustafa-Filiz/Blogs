export interface SignupData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface UpdateData {
  id: number
  name: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface Like {
  id: number
  userId: number
}

export interface Comment {
  id: number
  content: string
  postId: number
  userId: number
  createdAt: string
  updatedAt: string
  User?: User
  Likes?: Like[]
}

export interface Post {
  id: number
  title: string
  content: string
  userId: number
  createdAt: string
  updatedAt: string
  User?: User
  Likes?: Like[]
  Comments?: Comment[]
}

export interface ApiResponse<T> {
  status: string
  data?: T
  message?: string
}

