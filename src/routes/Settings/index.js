import { injectReducer } from '../../store/reducers'
import SettingsAccountsRoute from '../SettingsAccounts'
import SettingsHistoryRoute from '../SettingsHistory'
import SettingsEditAlipayRoute from '../SettingsEditAlipay'
import SettingsEditAccountRoute from '../SettingsEditAccount'

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
  , childRoutes: [
    SettingsAccountsRoute(store),
    SettingsHistoryRoute(store),
    SettingsEditAlipayRoute(store),
    SettingsEditAccountRoute(store)
  ]
})

