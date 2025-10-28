import { Request, Response } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { User } from '../types/User'
import { ValidationError } from '../utils/errors'
import { UserService } from '../services/UserServices'
import { generateToken } from '../utils/jwt'
import { hashPassword } from '../utils/hashPassword'

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body

  if (!name || !email || !password) {
    throw new ValidationError('Name, email and password are required')
  }

  const user = await UserService.createUser(name, email, password)
  const token = generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
  })

  res.cookie('blogsToken', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  })

  res.status(201).json({
    status: 'success',
    data: {
      user: { id: user.id, name: user.name, email: user.email },
    },
  })
})

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = Number(req.params.id)
  const updatedFields: Partial<Omit<User, 'id' | 'email'>> = req.body
  const user = await UserService.getUserById(userId)

  if (updatedFields.name) {
    user.name = updatedFields.name
  }

  if (updatedFields.password) {
    user.password = await hashPassword(updatedFields.password)
  }

  await user.save()

  res.status(201).json({
    status: 'success',
  })
})
