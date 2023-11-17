import express from 'express'
import authRoute from './auth.route'
import userRoute from './user.route'
import docsRoute from './docs.route'
import jobRoute from './job.route'
import gameRoute from './game.route'
import albumRoute from './album.route'
import postRoute from './post.route'
import adminRoute from './admin.route'
import config from '../../config/config'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/job',
    route: jobRoute
  },
  {
    path: '/game',
    route: gameRoute
  },
  {
    path: '/album',
    route: albumRoute
  },
  {
    path: '/post',
    route: postRoute
  },
  {
    path: '/admin',
    route: adminRoute
  }
]

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

export default router
