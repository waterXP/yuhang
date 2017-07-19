import { injectReducer } from '@/store/reducers'

import { ACTION_HANDLERS } from './modules/HomeList'
export const HomeListHandlers = ACTION_HANDLERS

export default (store) => ({
  path : 'home_list',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeListContainer').default
      //const reducer = require('./modules/HomeApproveList').default
      //console.log(reducer);
      //injectReducer(store, { key: 'approveList', reducer })
      cb(null, Container)
    }, 'home_list')
  }
})
