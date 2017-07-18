import { connect } from 'react-redux'
import { getNotPaid, initialNotPaid, getSumMoney, isLoading, loadMore } from '../modules/HomeNotPaid'

import HomeNotPaid from '../components/HomeNotPaid'

const mapStateToProps = (state) => {
  return {
    notPaid: {
      data: state.home.notPaid,
      sumMoney: state.home.notPaidSumMoney,
      noMore: state.home.noMore,
      isLoading: state.home.isLoading,
      loadMore: state.home.loadMore
    }
  }
}

const mapDispatchToProps = {
  getNotPaid,
  initialNotPaid,
  getSumMoney,
  isLoading,
  loadMore
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeNotPaid)
