export default (store) => ({
  path : 'forget',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./ForgetContainer').default
      cb(null, Container)
    }, 'forget')
  }
})
