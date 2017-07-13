import { injectReducer } from '@/store/reducers'
import { ACTION_HANDLERS } from './modules/HomeDraft'
export const HomeDraft = ACTION_HANDLERS

export default (store) => ({
  path : 'draft',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeDraftContainer').default
      //const reducer = require('./modules/HomeDraft').default
      //injectReducer(store, { key: 'draft', reducer })
      cb(null, Container)
    }, 'draft')
  }
})