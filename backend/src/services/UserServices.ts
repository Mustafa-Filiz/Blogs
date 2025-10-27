import User from '../database/models/user.model'
import { ValidationError } from '../utils/errors'
import { hashPassword } from '../utils/hashPassword'

export class UserService {
  static async createUser(name: string, email: string, password: string) {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) throw new ValidationError('Email is already taken')

    const hashedPassword = await hashPassword(password)

    return await User.create({ name, email, password: hashedPassword })
  }
}
