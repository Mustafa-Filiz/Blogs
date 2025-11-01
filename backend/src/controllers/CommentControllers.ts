import { catchAsync } from '../utils/catchAsync'
import { Response } from 'express'
import { Comment } from '../types/Comment'
import { AuthRequest } from '../types/AuthRequest'
import { ValidationError } from '../utils/errors'
import { CommentServices } from '../services/CommentServices'

export const createComment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { content, postId }: Omit<Comment, 'id' | 'userId'> = req.body

    if (!content || !postId)
      throw new ValidationError('Content and postId are required')

    const newComment = await CommentServices.create({
      content,
      postId,
      userId: req.user!.id,
    })

    res.send({
      status: 200,
      data: newComment,
    })
  }
)

export const getComment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const commentId = Number(req.params.id)

    const comment = await CommentServices.getComment(commentId)

    res.send({
      status: 200,
      data: comment,
    })
  }
)

export const getCommentsByPost = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const postId = Number(req.params.postId)

    const comments = await CommentServices.getCommentsByPost(postId)

    res.send({
      status: 200,
      data: comments,
    })
  }
)

export const getCommentsByUser = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const userId = Number(req.params.id)

    const comments = await CommentServices.getCommentsByUser(userId)

    res.send({
      status: 200,
      data: comments,
    })
  }
)

export const updateComment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const commentId = Number(req.params.id)
    const { content } = req.body as Partial<
      Omit<Comment, 'id' | 'userId' | 'postId'>
    >

    const comment = await CommentServices.getComment(commentId)

    if (content) {
      comment.content = content
    }

    await comment.save()

    res.send({
      status: 200,
      data: comment,
    })
  }
)

export const deleteComment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const commentId = Number(req.params.id)

    const comment = await CommentServices.getComment(commentId)

    await comment.destroy()

    res.send({
      status: 200,
      message: 'Comment deleted successfully',
    })
  }
)
