import { catchAsync } from '../utils/catchAsync'
import { Response } from 'express'
import { Post } from '../types/Post'
import { AuthRequest } from '../types/AuthRequest'
import { ValidationError } from '../utils/errors'
import { PostService } from '../services/PostService'

export const createPost = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { title, content }: Omit<Post, 'id' | 'userId'> = req.body

    if (!title || !content)
      throw new ValidationError('Title and content is required')

    const newPost = await PostService.create({
      title,
      content,
      userId: req.user!.id,
    })

    res.send({
      status: 200,
      data: newPost,
    })
  }
)

export const getUserPosts = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const userId = Number(req.params.id)

    const userPosts = await PostService.getUserPosts(userId)

    res.send({
      status: 200,
      data: userPosts,
    })
  }
)

export const getPost = catchAsync(async (req: AuthRequest, res: Response) => {
  const postId = Number(req.params.id)

  const post = await PostService.getPost(postId)

  if (!post) throw new ValidationError('Post not found')

  res.send({
    status: 200,
    data: post,
  })
})

export const updatePost = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const postId = Number(req.params.id)
    const { title, content } = req.body as Partial<Omit<Post, 'id' | 'userId'>>

    const post = await PostService.getPost(postId)

    if (title) {
      post.title = title
    }

    if (content) {
      post.content = content
    }

    await post.save()

    res.send({
      status: 200,
      data: post,
    })
  }
)

export const deletePost = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const postId = Number(req.params.id)

    const post = await PostService.getPost(postId)

    if (!post) throw new ValidationError('Post not found')

    await post.destroy()

    res.send({
      status: 200,
      message: 'Post deleted successfully',
    })
  }
)
