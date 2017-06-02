import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'edit/account',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsEditAccountContainer').default
      const reducer = require('./modules/SettingsEditAccount').default
      injectReducer(store, { key: 'settings', reducer })
      cb(null, Container)
    }, 'editAccount')
  }
})

