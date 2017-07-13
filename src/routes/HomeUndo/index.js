import { injectReducer } from '@/store/reducers'
import {ACTION_HANDLERS} from './modules/HomeUndo'
export const HomeUndo = ACTION_HANDLERS

export default (store) => ({
  path : 'undo',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeUndoContainer').default
      //const reducer = require('./modules/HomeUndo').default
      //injectReducer(store, { key: 'undo', reducer })
      cb(null, Container)
    }, 'undo')
  }
})