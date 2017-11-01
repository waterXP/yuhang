import { connect } from 'react-redux'
import { getPaidHistory, isLoading, loadMore,
    clearHistory, setFilterTime } from '../../HomeHistory/modules/HomeHistory'

import HomeHistoryFilter from '../components/HomeHistoryFilter'
const mapStateToProps = (state) => {
  return {
    paidHistory : state.home.paidHistory,
    query: state.location.query,
    loadingBool: state.home.isLoading,
    loadMoreBool: state.home.loadMore,
    total_page: state.home.total_page,
    cPage: state.home.cPage,
    time: state.home.time
  }
}

const mapDispatchToProps = {
  getPaidHistory,
  isLoading,
  loadMore,
  clearHistory,
  setFilterTime
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHistoryFilter)
