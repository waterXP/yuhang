import { connect } from 'react-redux'
import HomeApproveDetail from '../components/HomeApproveDetail'
import {initialApproveDetail,getApproveDetail} from '../modules/HomeApproveDetail'


const mapStateToProps = (state) => {
  //console.log('state',state);
  return {
    detail:state.home.detail
  }
}

const mapDispatchToProps = {
  initialApproveDetail,
  getApproveDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeApproveDetail)