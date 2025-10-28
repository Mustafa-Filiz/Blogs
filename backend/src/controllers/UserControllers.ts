import { Request, Response } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { User } from '../types/User'
import { ValidationError } from '../utils/errors'
import { UserService } from '../services/UserServices'
import { comparePassword, hashPassword } from '../utils/password'
import { generateToken } from '../utils/jwt'

const token = (user: User, res: Response) => {
  const generatedToken = generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
  })

  res.cookie('blogsToken', generatedToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  })
}

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body

  if (!name || !email || !password) {
    throw new ValidationError('Name, email and password are required')
  }

  const user = await UserService.createUser(name, email, password)
  token(user, res)

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

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = Number(req.params.id)
  const user = await UserService.getUserById(userId)

  await user.destroy()

  res.status(201).json({
    status: 'success',
  })
})

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password }: Omit<User, 'name' | 'id'> = req.body

  const user = await UserService.getUserByEmail(email)

  if (!user) {
    throw new ValidationError('Wrong email or password')
  }

  const isPasswordValid = await comparePassword(password, user.password)

  if (!isPasswordValid) {
    throw new ValidationError('Wrong email or password')
  }

  token(user, res)

  res.status(201).json({
    status: 'success',
    data: {
      user: { id: user.id, name: user.name, email: user.email },
    },
  })
})

export const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('blogsToken', {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  })

  res.send({ status: 'success' })
})
