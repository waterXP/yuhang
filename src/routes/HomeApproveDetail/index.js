import { ACTION_HANDLERS } from './modules/HomeApproveDetail'
export const HomeApproveDetail = ACTION_HANDLERS

export default (store) => ({
  path : 'approve/detail/:id/:type',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeApproveDetail').default
      cb(null, Container)
    }, 'approveDetail')
  }
})
