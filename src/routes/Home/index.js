import { injectReducer } from '../../store/reducers'
import HomeApproveDetailRoute from '../HomeApproveDetail'
import HomeHistoryRoute from '../HomeHistory'
import HomeHistoryFilterRoute from '../HomeHistoryFilter'
import HomeHistoryDetailRoute from '../HomeHistoryDetail'
import HomeListRoute from '../HomeList'
import HomeCommentRoute from '../HomeComment'

export default (store) => ({
  path : 'home',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeContainer').default
      const reducer = require('./modules/home').default
      injectReducer(store, { key: 'home', reducer })
      cb(null, Container)
    }, 'home')
  },
  childRoutes: [
    HomeApproveDetailRoute(store),
    HomeHistoryRoute(store),
    HomeHistoryFilterRoute(store),
    HomeHistoryDetailRoute(store),
    HomeListRoute(store),
    HomeCommentRoute(store)
  ]
})
