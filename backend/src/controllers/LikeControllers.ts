import { catchAsync } from '../utils/catchAsync'
import { AuthRequest } from '../types/AuthRequest'
import { Response } from 'express'
import { LikeServices } from '../services/LikeServices'
import { ValidationError } from '../utils/errors'

export const like = catchAsync(async (req: AuthRequest, res: Response) => {
  const { id: userId } = req.user!
  const { type, id } = req.params

  if (type !== 'post' && type !== 'comment') {
    throw new ValidationError('Invalid type. Must be "post" or "comment"')
  }

  const targetId = Number(id)

  if (type === 'post') {
    // Check if like already exists
    const existingLike = await LikeServices.findLikeByPost(targetId, userId)
    if (existingLike) {
      throw new ValidationError('Post already liked')
    }

    await LikeServices.create({
      postId: targetId,
      userId,
    })
  } else {
    // Check if like already exists
    const existingLike = await LikeServices.findLikeByComment(targetId, userId)
    if (existingLike) {
      throw new ValidationError('Comment already liked')
    }

    await LikeServices.create({
      commentId: targetId,
      userId,
    })
  }

  res.send({
    status: 200,
    message: 'success',
  })
})

export const unlike = catchAsync(async (req: AuthRequest, res: Response) => {
  const { id: userId } = req.user!
  const { type, id } = req.params

  if (type !== 'post' && type !== 'comment') {
    throw new ValidationError('Invalid type. Must be "post" or "comment"')
  }

  const targetId = Number(id)

  if (type === 'post') {
    const like = await LikeServices.getLikeByPost(targetId, userId)
    await like.destroy()
  } else {
    const like = await LikeServices.getLikeByComment(targetId, userId)
    await like.destroy()
  }

  res.send({
    status: 200,
    message: 'success',
  })
})
