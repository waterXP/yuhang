import { connect } from 'react-redux'
import { getPaidHistory, isLoading, loadMore, clearHistory, setFilterTime } from '../modules/HomeHistory'

import HomeHistory from '../components/HomeHistory'
const mapStateToProps = (state) => {
  return {
    paidHistory : state.home.paidHistory,
    query: state.location.query,
    loadingBool: state.home.isLoading,
    loadMoreBool: state.home.loadMore,
    total_page: state.home.total_page,
    cPage: state.home.cPage
  }
}

const mapDispatchToProps = {
  getPaidHistory,
  isLoading,
  loadMore,
  clearHistory,
  setFilterTime
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHistory)
