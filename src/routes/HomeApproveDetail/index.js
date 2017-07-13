import { injectReducer } from '@/store/reducers'

import { ACTION_HANDLERS } from './modules/HomeApproveDetail'
export const HomeApproveDetail = ACTION_HANDLERS

export default (store) => ({
  path : 'approveDetail/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeApproveDetail').default
      cb(null, Container)
    }, 'approveDetail')
  }
})