import { injectReducer } from '@/store/reducers'

import { ACTION_HANDLERS } from './modules/HomeApproveDetail'
export const HomeApproveDetail = ACTION_HANDLERS

export default (store) => ({
  path : 'approve_detail/:id/:type',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeApproveDetail').default
      cb(null, Container)
    }, 'approve_detail')
  }
})
