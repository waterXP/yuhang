import { connect } from 'react-redux'
import { addComment } from '@/routes/Approval/modules/Approval'

import ApprovalComment from '../components/ApprovalComment'

const mapStateToProps = (state) => ({
  approvalDetail: state.approval.approvalDetail,
  query: state.location.query,
  isBusy: state.approval.isBusy
})

const mapDispatchToProps = {
  addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalComment)
