import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'detail',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ApprovalDetailContainer').default
      cb(null, Container)
    }, 'detail')
  }
})

