import { injectReducer } from '@/store/reducers'

import { ACTION_HANDLERS } from './modules/HomeApproveList'
export const HomeApproveList = ACTION_HANDLERS

export default (store) => ({
  path : 'approveList',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeApproveContainer').default
      //const reducer = require('./modules/HomeApproveList').default
      //console.log(reducer);
      //injectReducer(store, { key: 'approveList', reducer })
      cb(null, Container)
    }, 'approveList')
  }
})