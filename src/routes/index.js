import CoreLayout from '@/layouts/CoreLayout'
import HomeRoute from './Home'
import LoginRoute from './Login'
import AccountRoute from './Account'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  childRoutes : [
    LoginRoute(store),
    HomeRoute(store),
    AccountRoute(store),
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
