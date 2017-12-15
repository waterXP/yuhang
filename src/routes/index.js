import CoreLayout from '@/layouts/CoreLayout'
import HomeRoute from './Home'
import LoginRoute from './Login'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  childRoutes : [
    LoginRoute(store),
    HomeRoute(store),
    {
      path: '*',
      component: CoreLayout,
      onEnter: ({ params }, replace) => {
        replace('/login')
      }
    }
  ]
})

export default createRoutes
