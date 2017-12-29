export default (store) => ({
  path : 'enterprise',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./EnterpriseContainer').default
      cb(null, Container)
    }, 'enterprise')
  }
})
