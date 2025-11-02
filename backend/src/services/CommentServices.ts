import { Comment } from '../types/Comment'
import CommentModel from '../database/models/comment.model'
import UserModel from '../database/models/user.model'
import LikeModel from '../database/models/like.model'
import { ValidationError } from '../utils/errors'

export class CommentServices {
  static async create(comment: Omit<Comment, 'id'>) {
    const newComment = await CommentModel.create(comment)
    // Fetch the comment with user info
    return await CommentModel.findByPk(newComment.id, {
      include: [
        {
          model: UserModel,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: LikeModel,
          attributes: ['id', 'userId'],
        },
      ],
    })
  }

  static async getComment(commentId: number) {
    const comment = await CommentModel.findOne({
      where: { id: commentId },
      include: [
        {
          model: UserModel,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: LikeModel,
          attributes: ['id', 'userId'],
        },
      ],
    })

    if (!comment) throw new ValidationError('Comment not found')

    return comment
  }

  static async getCommentsByPost(postId: number) {
    return await CommentModel.findAll({
      where: { postId },
      include: [
        {
          model: UserModel,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: LikeModel,
          attributes: ['id', 'userId'],
        },
      ],
      order: [['createdAt', 'DESC']],
    })
  }

  static async getCommentsByUser(userId: number) {
    return await CommentModel.findAll({ where: { userId } })
  }
}
