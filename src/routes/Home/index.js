import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'home',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeContainer').default
      const reducer = require('./modules/home').default
      injectReducer(store, { key: 'home', reducer })
      cb(null, Container)
    }, 'home')
  }
})
