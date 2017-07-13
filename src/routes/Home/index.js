//import HomeContainer from './containers/HomeContainer'

// Sync route definition
/*export default {
  component : HomeContainer
}*/
import { injectReducer } from '../../store/reducers'
import HomeApproveListRoute from '../HomeApproveList'
import HomeApproveDetailRoute from '../HomeApproveDetail'
import HomeNotPaidRoute from '../HomeNotPaid'
import HomeDraftRoute from '../HomeDraft'
import HomeRejectRoute from '../HomeReject'
import HomeUndoRoute from '../HomeUndo'
import HomeHistoryRoute from '../SettingsHistory'
import HomeHistoryDetailRoute from '../SettingsHistoryDetail'

export default (store) => ({
  path : 'home',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/HomeContainer').default
      const reducer = require('./modules/home').default
      injectReducer(store, { key: 'home', reducer })
      cb(null, Container)
    }, 'home')
  }, childRoutes: [
    HomeApproveListRoute(store),
    HomeNotPaidRoute(store),
    HomeDraftRoute(store),
    HomeRejectRoute(store),
    HomeUndoRoute(store),
    HomeApproveDetailRoute(store),
    HomeHistoryRoute(store),
    HomeHistoryDetailRoute(store)
  ]
})
