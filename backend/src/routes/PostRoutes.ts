import express from 'express'
import { createPost, getPost, getUserPosts, } from '../controllers/PostControllers'

const postRouter = express.Router()

postRouter.post('/create', createPost)
postRouter.get('/user-posts/:id', getUserPosts)
postRouter.get('/:id', getPost)

export default postRouter
