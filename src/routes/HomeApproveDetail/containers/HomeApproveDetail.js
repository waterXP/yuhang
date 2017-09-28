import { connect } from 'react-redux'
import HomeApproveDetail from '../components/HomeApproveDetail'
import {
  initialApproveDetail,
  getApproveDetail,
  deleteExp,
  detailLoading
} from '../modules/HomeApproveDetail'

const mapStateToProps = (state) => {
  return {
    detail: state.home.detail,
    isLoading: state.home.isLoading,
    isBusy: state.home.isBusy
  }
}

const mapDispatchToProps = {
  initialApproveDetail,
  getApproveDetail,
  deleteExp,
  detailLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeApproveDetail)
