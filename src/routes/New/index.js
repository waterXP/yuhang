import { injectReducer } from '@/store/reducers'
import NewTypeRoute from '../NewType'

export default (store) => ({
  path : 'new',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/NewContainer').default
      const reducer = require('./modules/new').default
      injectReducer(store, { key: 'new', reducer })
      cb(null, Container)
    }, 'new')
  },
  childRoutes: [
    NewTypeRoute(store)
  ]
})
