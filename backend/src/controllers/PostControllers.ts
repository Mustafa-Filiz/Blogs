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

    if (!req.user) throw new ValidationError('User is required')

    const newPost = await PostService.create({
      title,
      content,
      userId: req.user.id,
    })

    res.send({
      status: 200,
      data: newPost,
    })
  }
)
