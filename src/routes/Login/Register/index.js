export default (store) => ({
  path : 'register',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./RegisterContainer').default
      cb(null, Container)
    }, 'register')
  }
})
