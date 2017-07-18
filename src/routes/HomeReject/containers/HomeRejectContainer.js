import { connect } from 'react-redux'
import { getReject, initialReject, isLoading, loadMore } from '../modules/HomeReject'
import HomeReject from '../components/HomeReject'

const mapStateToProps = (state) => {
  return {
    reject:state.home.reject,
    loading:state.home.isLoading,
    noMore:state.home.noMore,
    loadMoreBool:state.home.loadMore
  }
}

const mapDispatchToProps = {
  getReject,
  initialReject,
  isLoading,
  loadMore
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeReject)
