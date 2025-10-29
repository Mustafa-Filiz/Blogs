import express from 'express'
import UserRoutes from './UserRoutes'
import postRoutes from './PostRoutes'
import { requireAuth } from '../utils/requireAuth'

const api = express.Router()

api.use('/user', UserRoutes)
api.use('/post', requireAuth, postRoutes)

export default api
