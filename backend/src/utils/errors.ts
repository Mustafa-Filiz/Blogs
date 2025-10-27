import { NextFunction, Request, Response } from 'express'

export class AppError extends Error {
  public status: number
  public isOperational: boolean

  constructor(message: string, status: number = 500, isOperational = true) {
    super(message)
    this.status = status
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  public details?: string[]

  constructor(message = 'Validation failed', details?: string[]) {
    super(message, 400)
    this.details = details
  }
}

export class AuthError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      status: 'fail',
      message: err.message,
      details: err.details,
    })
  }

  if (err instanceof AuthError) {
    return res.status(err.status).json({
      status: 'fail',
      message: err.message,
    })
  }

  if (err instanceof AppError && err.isOperational) {
    return res.status(err.status).json({
      status: err.status >= 500 ? 'error' : 'fail',
      message: err.message,
    })
  }

  console.error('Unhandled Error:', err)
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
}
