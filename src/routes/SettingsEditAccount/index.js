import SettingsSetBranchRoute from '../SettingsSetBranch'
// console.log(SettingsSetBranchRoute)
export default (store) => ({
  path : 'edit/account',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/SettingsEditAccountContainer').default
      cb(null, Container)
    }, 'editAccount')
  },
  childRoutes: [
    SettingsSetBranchRoute(store)
  ]
})
