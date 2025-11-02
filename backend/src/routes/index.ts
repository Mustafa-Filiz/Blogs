import express from 'express'
import UserRoutes from './UserRoutes'
import postRoutes from './PostRoutes'
import likeRoutes from './LikeRoutes'
import commentRoutes from './CommentRoutes'
import { requireAuth } from '../utils/requireAuth'

const api = express.Router()

api.use('/user', UserRoutes)
api.use('/post', postRoutes)
api.use('/like', requireAuth, likeRoutes)
// Make getCommentsByPost public, other routes require auth
api.use('/comment', commentRoutes)

export default api
