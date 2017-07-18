import { ACTIONS_HANDLERS } from './modules/HomeHistory'
export const HomeHistoryHandlers = ACTIONS_HANDLERS

export default (store) => ({
  path : 'history',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeHistoryContainer').default
      cb(null, Container)
    }, 'history')
  }
})
