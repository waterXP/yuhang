import { injectReducer } from '@/store/reducers'
import ApprovalSearchRoute from '../ApprovalSearch'
import ApprovalFilterRoute from '../ApprovalFilter'

export default (store) => ({
  path : 'approval',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ApprovalContainer').default
      const reducer = require('./modules/Approval').default
      injectReducer(store, { key: 'approval', reducer })
      cb(null, Container)
    }, 'approval')
  }, childRoutes: [
    ApprovalSearchRoute(store),
    ApprovalFilterRoute(store)
  ]
})

