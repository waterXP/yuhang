import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'edit/alipay',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsEditAlipayContainer').default
      // const reducer = require('./modules/SettingsEditAlipay').default
      // injectReducer(store, { key: 'settings', reducer })
      cb(null, Container)
    }, 'editAlipay')
  }
})

