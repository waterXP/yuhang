import { injectReducer } from '../../store/reducers'
// import Settings from '../Settings'

export default (store) => ({
  path : 'accounts',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsAccountsContainer').default
      const reducer = require('./modules/SettingsAccounts').default
      injectReducer(store, { key: 'settings', reducer })
      cb(null, Container)
    }, 'accounts')
  }
})

