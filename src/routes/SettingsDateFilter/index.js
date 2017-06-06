import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'date/filter',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsDateFilterContainer').default
      const reducer = require('./modules/SettingsDateFilter').default
      injectReducer(store, { key: 'settings', reducer })
      cb(null, Container)
    }, 'dateFilter')
  }
})

