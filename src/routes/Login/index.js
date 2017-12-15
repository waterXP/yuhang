import { injectReducer } from '@/store/reducers'
import RegisterRoute from './Register'
import ForgetRoute from './Forget'
export default (store) => ({
  path : 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./LoginContainer').default
      const reducer = require('./modules/login').default
      injectReducer(store, { key: 'login', reducer })
      cb(null, Container)
    }, 'login')
  },
  childRoutes: [
    RegisterRoute(store),
    ForgetRoute(store)
  ]
})
