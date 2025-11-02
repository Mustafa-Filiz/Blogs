import express from 'express'
import {
  createUser,
  deleteUser,
  getCurrentUser,
  login,
  logout,
  updateUser,
} from '../controllers/UserControllers'
import { requireAuth } from '../utils/requireAuth'

const userRouter = express.Router()

userRouter.post('/sign-up', createUser)
userRouter.post('/login', login)
userRouter.get('/logout', logout)
userRouter.get('/me', requireAuth, getCurrentUser)
userRouter.patch('/update/:id', requireAuth, updateUser)
userRouter.get('/delete/:id', requireAuth, deleteUser)

export default userRouter
