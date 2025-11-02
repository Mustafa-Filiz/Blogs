import { Like } from '../types/Like'
import LikeModel from '../database/models/like.model'
import { ValidationError } from '../utils/errors'

export class LikeServices {
  static async create(like: Omit<Like, 'id'>) {
    return await LikeModel.create(like)
  }

  static async getLikeByPost(postId: number, userId: number) {
    return await LikeModel.findOne({ where: { postId, userId } })
  }

  static async getLikeByComment(commentId: number, userId: number) {
    return await LikeModel.findOne({ where: { commentId, userId } })
  }
}
