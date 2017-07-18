import { connect } from 'react-redux'
import { getPaidHistory, isLoading, loadMore } from '../modules/SettingsHistory'

import SettingsHistory from '../components/SettingsHistory'
const mapStateToProps = (state) => {
  return {
    paidHistory : state.home.paidHistory,
    query: state.location.query,
    loadingBool:state.home.isLoading,
    loadMoreBool:state.home.loadMore,
    total_page:state.home.total_page,
    cPage:state.home.cPage
  }
}

const mapDispatchToProps = {
  getPaidHistory,
  isLoading,
  loadMore
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHistory)

