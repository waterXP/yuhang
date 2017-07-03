import { injectReducer } from '@/store/reducers'

import { ACTIONS_HANDLERS } from './modules/SettingsDateFilter'
export const settingsDateFilterHandlers = ACTIONS_HANDLERS

export default (store) => ({
  path : 'date/filter',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsDateFilterContainer').default
      cb(null, Container)
    }, 'dateFilter')
  }
})

