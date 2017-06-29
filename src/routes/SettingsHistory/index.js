import { injectReducer } from '../../store/reducers'

import { ACTIONS_HANDLERS } from './modules/SettingsHistory'
export const settingsHistoryHandlers = ACTIONS_HANDLERS

export default (store) => ({
  path : 'history',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsHistoryContainer').default
      cb(null, Container)
    }, 'history')
  }
})

