import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword)
}
