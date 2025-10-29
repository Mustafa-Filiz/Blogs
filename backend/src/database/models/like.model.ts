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

class Like extends Model<InferAttributes<Like>, InferCreationAttributes<Like>> {
  declare id: CreationOptional<number>
  declare postId: number
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
    postId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
  }
)

User.hasMany(Like)
Post.hasMany(Like)
Like.belongsTo(User, { foreignKey: 'userId' })
Like.belongsTo(Post, { foreignKey: 'postId' })

export default Like
