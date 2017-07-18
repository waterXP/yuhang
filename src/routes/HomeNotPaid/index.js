import { ACTION_HANDLERS } from './modules/HomeNotPaid'
export const HomeNotPaidList = ACTION_HANDLERS

export default (store) => ({
  path: 'not_paid',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeNotPaidContainer').default
      cb(null, Container)
    }, 'not_paid')
  }
})
