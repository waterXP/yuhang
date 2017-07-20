import { ACTION_HANDLERS } from './modules/HomeList'
export const HomeListHandlers = ACTION_HANDLERS

export default (store) => ({
  path : 'home_list',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeListContainer').default
      cb(null, Container)
    }, 'home_list')
  }
})
