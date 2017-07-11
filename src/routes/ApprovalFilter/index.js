import { injectReducer } from '@/store/reducers'

import { ACTION_HANDLERS } from './modules/ApprovalFilter'
export const approvalFilterHandlers = ACTION_HANDLERS

export default (store) => ({
  path : 'filter',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ApprovalFilterContainer').default
//      const reducer = require('./modules/ApprovalFilter').default
//      injectReducer(store, { key: 'ApprovalFilter', reducer })
      cb(null, Container)
    }, 'filter')
  }
})

