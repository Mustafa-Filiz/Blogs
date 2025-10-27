import express from 'express'
import { createUser } from '../controllers/UserControllers'

const userRouter = express.Router()

userRouter.post('/add', createUser)

export default userRouter
