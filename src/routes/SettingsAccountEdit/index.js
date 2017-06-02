import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'account/edit',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsAccountEditContainer').default
      const reducer = require('./modules/settingsAccountEdit').default
      injectReducer(store, { key: 'settings', reducer })
      cb(null, Container)
    }, 'accountEdit')
  }
})

