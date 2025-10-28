import express from 'express'
import { createUser, updateUser } from '../controllers/UserControllers'
import { requireAuth } from '../utils/requireAuth'

const userRouter = express.Router()

userRouter.post('/sign-up', createUser)
userRouter.patch('/update/:id', requireAuth, updateUser)

export default userRouter
