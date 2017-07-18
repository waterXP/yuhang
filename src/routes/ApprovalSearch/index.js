export default (store) => ({
  path : 'search',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ApprovalSearchContainer').default
      cb(null, Container)
    }, 'search')
  }
})
