import express from 'express'
import UserRoutes from './UserRoutes'
import postRoutes from './PostRoutes'

const api = express.Router()

api.use('/user', UserRoutes)
api.use('/post', postRoutes)

export default api
