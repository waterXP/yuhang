export default (store) => ({
  path : 'filter/results',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ApprovalFilterResultsContainer').default
      cb(null, Container)
    }, 'filterResults')
  }
})
