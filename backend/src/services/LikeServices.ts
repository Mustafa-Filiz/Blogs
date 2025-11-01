import { Like } from '../types/Like'
import LikeModel from '../database/models/like.model'
import { ValidationError } from '../utils/errors'

export class LikeServices {
  static async create(like: Omit<Like, 'id'>) {
    return await LikeModel.create(like)
  }

  static async getLikeByPost(postId: number, userId: number) {
    const like = await LikeModel.findOne({ where: { postId, userId } })

    if (!like) throw new ValidationError('Like not found')

    return like
  }

  static async getLikeByComment(commentId: number, userId: number) {
    const like = await LikeModel.findOne({ where: { commentId, userId } })

    if (!like) throw new ValidationError('Like not found')

    return like
  }

  static async findLikeByPost(postId: number, userId: number) {
    return await LikeModel.findOne({ where: { postId, userId } })
  }

  static async findLikeByComment(commentId: number, userId: number) {
    return await LikeModel.findOne({ where: { commentId, userId } })
  }
}
