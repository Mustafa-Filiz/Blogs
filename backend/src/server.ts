import express from 'express'
import { sequelize } from './database/sequelize'
import cors from 'cors'
import api from './routes'
import { errorHandler } from './utils/errors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.PORT || 8000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api', api)
app.use(errorHandler)

sequelize.sync({ alter: true }).then(() => {
  console.log('Database connected')
  app.listen(port, () => console.log(`Server started on port ${port}`))
})

export default app
