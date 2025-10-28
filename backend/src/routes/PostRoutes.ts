import express from 'express'
import { requireAuth } from '../utils/requireAuth'
import { createPost } from '../controllers/PostControllers'

const postRouter = express.Router()

postRouter.post('/create', requireAuth, createPost)

export default postRouter
