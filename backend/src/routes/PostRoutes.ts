import express from 'express'
import { requireAuth } from '../utils/requireAuth'
import { createPost, getUserPosts } from '../controllers/PostControllers'

const postRouter = express.Router()

postRouter.post('/create', requireAuth, createPost)
postRouter.get('/my-posts', requireAuth, getUserPosts)

export default postRouter
