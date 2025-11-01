import { Comment } from '../types/Comment'
import CommentModel from '../database/models/comment.model'
import { ValidationError } from '../utils/errors'

export class CommentServices {
  static async create(comment: Omit<Comment, 'id'>) {
    return await CommentModel.create(comment)
  }

  static async getComment(commentId: number) {
    const comment = await CommentModel.findOne({ where: { id: commentId } })

    if (!comment) throw new ValidationError('Comment not found')

    return comment
  }

  static async getCommentsByPost(postId: number) {
    return await CommentModel.findAll({ where: { postId } })
  }

  static async getCommentsByUser(userId: number) {
    return await CommentModel.findAll({ where: { userId } })
  }
}
