import { ACTIONS_HANDLERS } from './modules/HomeDateFilter'
export const HomeDateFilterHandlers = ACTIONS_HANDLERS

export default (store) => ({
  path : 'date/filter',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeDateFilterContainer').default
      cb(null, Container)
    }, 'dateFilter')
  }
})
