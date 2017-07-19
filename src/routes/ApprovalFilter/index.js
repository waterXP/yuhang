export default (store) => ({
  path : 'filter',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ApprovalFilterContainer').default
      cb(null, Container)
    }, 'filter')
  }
})
