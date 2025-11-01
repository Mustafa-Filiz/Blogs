import express from 'express'
import UserRoutes from './UserRoutes'
import postRoutes from './PostRoutes'
import likeRoutes from './LikeRoutes'
import commentRoutes from './CommentRoutes'
import { requireAuth } from '../utils/requireAuth'

const api = express.Router()

api.use('/user', UserRoutes)
api.use('/post', requireAuth, postRoutes)
api.use('/like', requireAuth, likeRoutes)
api.use('/comment', requireAuth, commentRoutes)

export default api
