import { connect } from 'react-redux'
import HomeList from '../components/HomeList'
import {
  initialApprove,
  getApproveList,
  getSumMoney,
  isLoading,
  loadMore,
  deleteExp
} from '../modules/HomeList'

const mapStateToProps = (state) => {
  return {
    approve:{
      approve:state.home.approve,
      approveSumMoney:state.home.approveSumMoney,
      loading:state.home.isLoading,
      noMore:state.home.noMore,
      loadMore:state.home.loadMore
    }
  }
}

const mapDispatchToProps = {
  initialApprove,
  getApproveList,
  getSumMoney,
  isLoading,
  loadMore,
  deleteExp
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeList)
