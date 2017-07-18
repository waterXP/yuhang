import { ACTION_HANDLERS } from './modules/HomeUndo'
export const HomeUndo = ACTION_HANDLERS

export default (store) => ({
  path : 'undo',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeUndoContainer').default
      cb(null, Container)
    }, 'undo')
  }
})
