import { injectReducer } from '@/store/reducers'

import { ACTIONS_HANDLERS } from './modules/SettingsHistoryDetail'
export const settingsHistoryDetailHandlers = ACTIONS_HANDLERS

export default (store) => ({
  path : 'detail',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsHistoryDetailContainer').default
      cb(null, Container)
    }, 'historyDetail')
  }
})

