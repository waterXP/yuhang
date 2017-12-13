export default (store) => ({
  path : 'branch',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsSetBranchContainer').default
      cb(null, Container)
    }, 'branch')
  }
})
