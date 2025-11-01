import express from 'express'
import {
  createComment,
  deleteComment,
  getComment,
  getCommentsByPost,
  getCommentsByUser,
  updateComment,
} from '../controllers/CommentControllers'

const commentRouter = express.Router()

commentRouter.post('/create', createComment)
commentRouter.get('/post/:postId', getCommentsByPost)
commentRouter.get('/user/:id', getCommentsByUser)
commentRouter.get('/:id', getComment)
commentRouter.patch('/update/:id', updateComment)
commentRouter.delete('/delete/:id', deleteComment)

export default commentRouter
