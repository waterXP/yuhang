import { injectReducer } from '../../store/reducers'
import HomeApproveDetailRoute from '../HomeApproveDetail'
import HomeHistoryRoute from '../HomeHistory'
import HomeHistoryDetailRoute from '../HomeHistoryDetail'
import HomeDateFilterRoute from '../HomeDateFilter'
import HomeListRoute from '../HomeList'

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
    HomeHistoryDetailRoute(store),
    HomeDateFilterRoute(store),
    HomeListRoute(store)
  ]
})
