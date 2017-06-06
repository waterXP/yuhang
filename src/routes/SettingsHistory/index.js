import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'history',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsHistoryContainer').default
      // const reducer = require('./modules/SettingsHistory').default
      // injectReducer(store, { key: 'settings', reducer })
      cb(null, Container)
    }, 'history')
  }
})

