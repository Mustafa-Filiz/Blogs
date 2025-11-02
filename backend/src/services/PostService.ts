import PostModel from '../database/models/post.model'
import CommentModel from '../database/models/comment.model'
import UserModel from '../database/models/user.model'
import LikeModel from '../database/models/like.model'
import { Post } from '../types/Post'
import { ValidationError } from '../utils/errors'

export class PostService {
  static async create(post: Omit<Post, 'id'>) {
    return await PostModel.create(post)
  }

  static async getUserPosts(userId: number) {
    return await PostModel.findAll({
      where: { userId },
      include: [CommentModel],
    })
  }

  static async getPost(postId: number) {
    const post = await PostModel.findOne({
      where: { id: postId },
      include: [
        {
          model: UserModel,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: LikeModel,
          attributes: ['id', 'userId'],
        },
        {
          model: CommentModel,
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
        },
      ],
      order: [['createdAt', 'DESC']],
    })

    if (!post) throw new ValidationError('Post not found')

    return post
  }

  static async getAllPosts() {
    return await PostModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    })
  }
}
