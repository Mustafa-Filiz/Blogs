import PostModel from '../database/models/post.model'
import { Post } from '../types/Post'
import { ValidationError } from '../utils/errors'

export class PostService {
  static async create(post: Omit<Post, 'id'>) {
    return await PostModel.create(post)
  }

  static async getUserPosts(userId: number) {
    return await PostModel.findAll({ where: { userId } })
  }

  static async getPost(postId: number) {
    const post = await PostModel.findOne({ where: { id: postId } })

    if (!post) throw new ValidationError('Post not found')

    return post
  }
}
