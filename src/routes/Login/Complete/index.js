export default (store) => ({
  path : 'complete',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./CompleteContainer').default
      cb(null, Container)
    }, 'complete')
  }
})
