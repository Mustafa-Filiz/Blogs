import { catchAsync } from '../utils/catchAsync'
import { AuthRequest } from '../types/AuthRequest'
import { Response } from 'express'
import { LikeServices } from '../services/LikeServices'

export const likePost = catchAsync(async (req: AuthRequest, res: Response) => {
  const postId = Number(req.params.postId)
  const { id: userId } = req.user!

  await LikeServices.create({
    postId,
    userId,
  })

  res.send({
    status: 200,
    message: 'success',
  })
})

export const unlikePost = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const postId = Number(req.params.postId)
    const { id: userId } = req.user!

    const like = await LikeServices.getLike(postId, userId)

    await like.destroy()

    res.send({
      status: 200,
      message: 'success',
    })
  }
)
