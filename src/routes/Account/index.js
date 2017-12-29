import { injectReducer } from '@/store/reducers'
import PersonalRoute from './Personal'
import EnterpriseRoute from './Enterprise'

export default (store) => ({
  path : 'account',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./AccountContainer').default
      const reducer = require('./modules/account').default
      injectReducer(store, { key: 'account', reducer })
      cb(null, Container)
    }, 'account')
  },
  childRoutes: [
    PersonalRoute(store),
    EnterpriseRoute(store)
  ]
})
