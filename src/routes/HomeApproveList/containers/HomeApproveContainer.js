import { connect } from 'react-redux'
import HomeApprove from '../components/HomeApprove'
import {initialApprove,getApproveList,getSumMoney} from '../modules/HomeApproveList'


const mapStateToProps = (state) => {
  //console.log('state',state);
  return {
    approve:{
      approve:state.home.approve,
      approveSumMoney:state.home.approveSumMoney
    }
  }
}

const mapDispatchToProps = {
  initialApprove,
  getApproveList,
  getSumMoney
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeApprove)