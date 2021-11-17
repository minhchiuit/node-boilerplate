import { Router } from 'express'
// import authRoutes from './auth.js'
// import uploadRoutes from './upload.js'
const router = new Router()

const defaultRoutes = [
  // {
  // 	path: '/upload',
  // 	route: 'uploadRoutes',
  // },
  {
    path: '/auth',
    // route: 'authRoutes',
    route: (req, res, next) => res.json({ success: true }),
  },
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
