import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'histroy/detail',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsHistoryDetailContainer').default
      // const reducer = require('./modules/SettingsHistoryDetail').default
      // injectReducer(store, { key: 'settings', reducer })
      cb(null, Container)
    }, 'historyDetail')
  }
})

