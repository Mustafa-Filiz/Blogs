import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export function generateToken(
  payload: object,
  options: SignOptions = {
    expiresIn: '1d',
  }
) {
  return jwt.sign(payload, JWT_SECRET!, options)
}

export function verifyToken(token: string, options: VerifyOptions = {}) {
  return jwt.verify(token, JWT_SECRET!, options)
}
