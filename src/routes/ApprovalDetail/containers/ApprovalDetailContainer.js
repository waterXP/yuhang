import { connect } from 'react-redux'
import { getApprovalDetail, addComment } from '@/routes/Approval/modules/Approval'

import ApprovalDetail from '../components/ApprovalDetail'

const mapStateToProps = (state) => ({
  approvalDetail: state.approval.approvalDetail,
  query: state.location.query,
  isBusy: state.approval.isBusy
})

const mapDispatchToProps = {
  getApprovalDetail,
  addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalDetail)
