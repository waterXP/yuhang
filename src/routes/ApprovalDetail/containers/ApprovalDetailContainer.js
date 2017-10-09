import { connect } from 'react-redux'
import { getApprovalDetail, addComment,
  deleteExp } from '@/routes/Approval/modules/Approval'

import ApprovalDetail from '../components/ApprovalDetail'

const mapStateToProps = (state) => ({
  approvalDetail: state.approval.approvalDetail,
  query: state.location.query,
  isBusy: state.approval.isBusy
})

const mapDispatchToProps = {
  getApprovalDetail,
  addComment,
  deleteExp
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalDetail)
