import { injectReducer } from '@/store/reducers'

export default (store) => ({
  path : 'main',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ApprovalMainContainer').default
      cb(null, Container)
    }, 'main')
  }
})
