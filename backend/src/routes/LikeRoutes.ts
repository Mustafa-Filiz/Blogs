import express from 'express'
import { like, unlike } from '../controllers/LikeControllers'

const likeRouter = express.Router()

// Unified like/unlike routes for both posts and comments
// Usage: POST /like/post/:id or POST /like/comment/:id
likeRouter.post('/:type/:id', like)
likeRouter.delete('/:type/:id', unlike)

export default likeRouter
