import { connect } from 'react-redux'
import HomeApprove from '../components/HomeApprove'
import {
  initialApprove,
  getApproveList,
  getSumMoney,
  getOffsetHeight,
  isLoading,
  loadMore } from '../modules/HomeApproveList'


const mapStateToProps = (state) => {
  //console.log('state==========',state);
  return {
    approve:{
      approve:state.home.approve,
      approveSumMoney:state.home.approveSumMoney,
      loading:state.home.isLoading,
      noMore:state.home.noMore,
      offsetHeight:state.home.offsetHeight,
      loadMore:state.home.loadMore
    }
  }
}

const mapDispatchToProps = {
  initialApprove,
  getApproveList,
  getSumMoney,
  isLoading,
  getOffsetHeight,
  loadMore
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeApprove)
