export default (store) => ({
  path : 'validate',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./ValidateContainer').default
      cb(null, Container)
    }, 'validate')
  }
})
