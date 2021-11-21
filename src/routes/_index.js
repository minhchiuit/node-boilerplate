import { Router } from 'express'
import authRoutes from './auth.route'
import userRoutes from './user.route'
// import uploadRoutes from './upload'
const router = new Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
