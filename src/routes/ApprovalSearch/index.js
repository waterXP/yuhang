import { injectReducer } from '@/store/reducers'
// import { ACTION_HANDLERS } from './modules/ApprovalSearch'
// export const ApprovalSearchHandlers = ACTION_HANDLERS

export default (store) => ({
  path : 'search',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ApprovalSearchContainer').default
//      const reducer = require('./modules/ApprovalSearch').default
//      injectReducer(store, { key: 'ApprovalSearch', reducer })
      cb(null, Container)
    }, 'search')
  }
})

