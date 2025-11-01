import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { sequelize } from '../sequelize'
import User from './user.model'
import Post from './post.model'
import Comment from './comment.model'

class Like extends Model<InferAttributes<Like>, InferCreationAttributes<Like>> {
  declare id: CreationOptional<number>
  declare postId: CreationOptional<number>
  declare commentId: CreationOptional<number>
  declare userId: number
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    postId: { type: DataTypes.INTEGER, allowNull: true },
    commentId: { type: DataTypes.INTEGER, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
    hooks: {
      beforeValidate: (like: Like) => {
        if (!like.postId && !like.commentId) {
          throw new Error('Either postId or commentId must be provided')
        }
      },
    },
  }
)

User.hasMany(Like)
Post.hasMany(Like)
Comment.hasMany(Like)
Like.belongsTo(User, { foreignKey: 'userId' })
Like.belongsTo(Post, { foreignKey: 'postId' })
Like.belongsTo(Comment, { foreignKey: 'commentId' })

export default Like
