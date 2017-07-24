import { connect } from 'react-redux'
import HomeApproveDetail from '../components/HomeApproveDetail'
import {
  initialApproveDetail,
  getApproveDetail,
  deleteExp,
  addComment,
  detailLoading
} from '../modules/HomeApproveDetail'

const mapStateToProps = (state) => {
  console.log('state',state)
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
  addComment,
  detailLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeApproveDetail)
