import { injectReducer } from '@/store/reducers'
import NewExpenseConfirmRoute from '../NewExpenseConfirm'

export default (store) => ({
  path : 'new',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/NewContainer').default
      const reducer = require('./modules/new').default
      injectReducer(store, { key: 'new', reducer })
      cb(null, Container)
    }, 'new')
  }, childRoutes: [
    NewExpenseConfirmRoute(store)
  ]
})

