import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'settings',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsContainer').default
      const reducer = require('./modules/settings').default
      injectReducer(store, { key: 'settings', reducer })
      cb(null, Container)
    }, 'settings')
  }
})

