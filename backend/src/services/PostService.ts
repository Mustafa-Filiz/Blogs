import PostModel from '../database/models/post.model'
import { Post } from '../types/Post'

export class PostService {
  static async create(post: Omit<Post, 'id'>) {
    return await PostModel.create(post)
  }

  static async getUserPosts(userId: number) {
    return await PostModel.findAll({ where: { userId } })
  }
}
