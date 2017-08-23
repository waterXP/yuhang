export default (store) => ({
  path : 'type',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/NewTypeContainer').default
      cb(null, Container)
    }, 'type')
  }
})
