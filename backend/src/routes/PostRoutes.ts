import express from 'express'
import {
  createPost,
  deletePost,
  getPost,
  getUserPosts,
  updatePost,
} from '../controllers/PostControllers'

const postRouter = express.Router()

postRouter.post('/create', createPost)
postRouter.get('/user-posts/:id', getUserPosts)
postRouter.get('/:id', getPost)
postRouter.patch('update/:id', updatePost)
postRouter.delete('delete/:id', deletePost)

export default postRouter
