import { ACTION_HANDLERS } from './modules/SettingsAccounts'
export const settingsAccountsHandlers = ACTION_HANDLERS

export default (store) => ({
  path : 'accounts',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsAccountsContainer').default
      cb(null, Container)
    }, 'accounts')
  }
})
