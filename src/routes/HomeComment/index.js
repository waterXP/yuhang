export default (store) => ({
  path : 'comment',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeCommentContainer').default
      cb(null, Container)
    }, 'comment')
  }
})
