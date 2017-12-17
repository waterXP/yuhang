export default (store) => ({
  path : 'modify',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./ModifyContainer').default
      cb(null, Container)
    }, 'modify')
  }
})
