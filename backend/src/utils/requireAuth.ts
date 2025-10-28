import { NextFunction, Response } from 'express'
import { AuthError } from './errors'
import { verifyToken } from './jwt'
import { User } from '../types/User'
import { AuthRequest } from '../types/AuthRequest'

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.blogsToken
  if (!token) throw new AuthError()

  const payload = verifyToken(token) as Omit<User, 'password'>
  if (!payload) throw new AuthError()

  req.user = payload
  return next()
}
