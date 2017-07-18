export default (store) => ({
  path : 'edit/alipay',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsEditAlipayContainer').default
      cb(null, Container)
    }, 'editAlipay')
  }
})

