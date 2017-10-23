export default (store) => ({
  path : 'imgs',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/NewImgsContainer').default
      cb(null, Container)
    }, 'imgs')
  }
})
