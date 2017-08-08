export default (store) => ({
  path : 'comment',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeListCommentContainer').default
      cb(null, Container)
    }, 'comment')
  }
})
