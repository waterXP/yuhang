import { injectReducer } from '@/store/reducers'
import { ACTIONS_HANDLERS } from './modules/HomeHistoryDetail'
export const HomeHistoryDetailHandlers = ACTIONS_HANDLERS

export default (store) => ({
  path : 'detail',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeHistoryDetailContainer').default
      cb(null, Container)
    }, 'historyDetail')
  }
})
