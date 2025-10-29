import express from 'express'
import { likePost, unlikePost } from '../controllers/LikeControllers'

const likeRouter = express.Router()

likeRouter.post('/add/:postId', likePost)
likeRouter.delete('/delete/:postId', unlikePost)

export default likeRouter
