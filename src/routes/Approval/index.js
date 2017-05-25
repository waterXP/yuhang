import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'approval',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ApprovalContainer').default
      const reducer = require('./modules/approval').default
      injectReducer(store, { key: 'approval', reducer })
      cb(null, Container)
    }, 'approval')
  }
})

