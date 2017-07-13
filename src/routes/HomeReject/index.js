import { injectReducer } from '@/store/reducers'
import { ACTION_HANDLERS } from './modules/HomeReject'
export const HomeReject = ACTION_HANDLERS


export default (store) => ({
  path : 'reject',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeRejectContainer').default
      //const reducer = require('./modules/HomeReject').default
      //injectReducer(store, { key: 'reject', reducer })
      cb(null, Container)
    }, 'reject')
  }
})