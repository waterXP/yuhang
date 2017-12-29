export default (store) => ({
  path : 'personal',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./PersonalContainer').default
      cb(null, Container)
    }, 'personal')
  }
})
