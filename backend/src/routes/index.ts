import UserRoutes from './UserRoutes'
import express from 'express'

const api = express.Router()

api.use('/user', UserRoutes)

export default api
