import User from './models/user.model'
import Post from './models/post.model'
import Like from './models/like.model'

User.hasMany(Post)
Post.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Like)
Post.hasMany(Like)
Like.belongsTo(User, { foreignKey: 'userId' })
Like.belongsTo(Post, { foreignKey: 'postId' })
