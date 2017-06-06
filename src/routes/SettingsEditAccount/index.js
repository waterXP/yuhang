import { injectReducer } from '../../store/reducers'
import { ACTION_HANDLERS } from './modules/SettingsEditAccount'
export const settingsEditAccountHandlers = ACTION_HANDLERS

export default (store) => ({
  path : 'edit/account',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsEditAccountContainer').default
      cb(null, Container)
    }, 'editAccount')
  }
})
