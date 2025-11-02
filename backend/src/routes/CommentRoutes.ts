import express from 'express'
import {
  createComment,
  deleteComment,
  getComment,
  getCommentsByPost,
  getCommentsByUser,
  updateComment,
} from '../controllers/CommentControllers'
import { requireAuth } from '../utils/requireAuth'

const commentRouter = express.Router()

// Public route - no auth required
commentRouter.get('/post/:postId', getCommentsByPost)

// Protected routes - auth required
commentRouter.post('/create', requireAuth, createComment)
commentRouter.get('/user/:id', requireAuth, getCommentsByUser)
commentRouter.get('/:id', requireAuth, getComment)
commentRouter.patch('/update/:id', requireAuth, updateComment)
commentRouter.delete('/delete/:id', requireAuth, deleteComment)

export default commentRouter
