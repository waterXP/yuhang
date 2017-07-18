import { ACTION_HANDLERS } from './modules/HomeDraft'
export const HomeDraft = ACTION_HANDLERS

export default (store) => ({
  path : 'draft',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeDraftContainer').default
      cb(null, Container)
    }, 'draft')
  }
})
