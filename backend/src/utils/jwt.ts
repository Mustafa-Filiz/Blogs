import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'

export function generateToken(
  payload: object,
  options: SignOptions = {
    expiresIn: '1d',
  }
) {
  const JWT_SECRET = process.env.JWT_SECRET as string
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined')
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

export function verifyToken(token: string, options: VerifyOptions = {}) {
  const JWT_SECRET = process.env.JWT_SECRET as string
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined')
  }
  return jwt.verify(token, JWT_SECRET!, options)
}
