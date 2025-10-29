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

class Comment extends Model<
  InferAttributes<Comment>,
  InferCreationAttributes<Comment>
> {
  declare id: CreationOptional<number>
  declare content: string
  declare postId: number
  declare userId: number
}

Comment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  }
)

User.hasMany(Comment)
Post.hasMany(Comment)
Comment.belongsTo(Post, { foreignKey: 'postId' })
Comment.belongsTo(User, { foreignKey: 'userId' })

export default Comment
