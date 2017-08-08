import { injectReducer } from '@/store/reducers'
import ApprovalMainRoute from '../ApprovalMain'
import ApprovalSearchRoute from '../ApprovalSearch'
import ApprovalFilterRoute from '../ApprovalFilter'
import ApprovalDetailRoute from '../ApprovalDetail'
import ApprovalCommentRoute from '../ApprovalComment'

export default (store) => ({
  path : 'approval',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ApprovalContainer').default
      const reducer = require('./modules/Approval').default
      injectReducer(store, { key: 'approval', reducer })
      cb(null, Container)
    }, 'approval')
  },
  childRoutes: [
    ApprovalMainRoute(store),
    ApprovalSearchRoute(store),
    ApprovalFilterRoute(store),
    ApprovalDetailRoute(store),
    ApprovalCommentRoute(store)
  ]
})
