export default (store) => ({
  path : 'administrator',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsAdministratorContainer').default
      cb(null, Container)
    }, 'administrator')
  }
})
