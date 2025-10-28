import express from 'express'
import {
  createUser,
  deleteUser,
  login,
  logout,
  updateUser,
} from '../controllers/UserControllers'
import { requireAuth } from '../utils/requireAuth'

const userRouter = express.Router()

userRouter.post('/sign-up', createUser)
userRouter.patch('/update/:id', requireAuth, updateUser)
userRouter.get('/delete/:id', requireAuth, deleteUser)
userRouter.post('/login', login)
userRouter.get('/logout', logout)

export default userRouter
