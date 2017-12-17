import { injectReducer } from '@/store/reducers'
import RegisterRoute from './Register'
import ForgetRoute from './Forget'
import ConfirmRoute from './Confirm'
import CompleteRoute from './Complete'
import ValidateRoute from './Validate'
import ModifyRoute from './Modify'

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
    ForgetRoute(store),
    ConfirmRoute(store),
    CompleteRoute(store),
    ValidateRoute(store),
    ModifyRoute(store)
  ]
})
