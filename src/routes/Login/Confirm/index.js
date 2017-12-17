export default (store) => ({
  path : 'confirm',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./ConfirmContainer').default
      cb(null, Container)
    }, 'confirm')
  }
})
