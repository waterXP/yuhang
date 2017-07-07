import { injectReducer } from '@/store/reducers'

export default (store) => ({
  path : 'count',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/CountContainer').default
      const reducer = require('./modules/count').default
      injectReducer(store, { key: 'count', reducer })
      cb(null, Container)
    }, 'count')
  }
})

