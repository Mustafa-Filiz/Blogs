import express from 'express'
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  getUserPosts,
  updatePost,
} from '../controllers/PostControllers'
import { requireAuth } from '../utils/requireAuth'

const postRouter = express.Router()

// Public routes - no authentication required
postRouter.get('/all', getAllPosts)
postRouter.get('/:id', getPost)

// Protected routes - authentication required
postRouter.post('/create', requireAuth, createPost)
postRouter.get('/user/:id', requireAuth, getUserPosts)
postRouter.patch('/update/:id', requireAuth, updatePost)
postRouter.delete('/delete/:id', requireAuth, deletePost)

export default postRouter
