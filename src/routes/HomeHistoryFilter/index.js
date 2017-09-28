export default (store) => ({
  path : 'history/filter',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeHistoryFilterContainer').default
      cb(null, Container)
    }, 'historyFilter')
  }
})
