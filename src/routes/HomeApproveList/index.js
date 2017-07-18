import { ACTION_HANDLERS } from './modules/HomeApproveList'
export const HomeApproveList = ACTION_HANDLERS

export default (store) => ({
  path : 'approve_list',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeApproveContainer').default
      cb(null, Container)
    }, 'approve_list')
  }
})
