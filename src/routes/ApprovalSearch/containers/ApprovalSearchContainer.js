import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/ApprovalSearch'

import ApprovalSearch from '../components/ApprovalSearch'
import { inBusy, getList } from '@/routes/Approval/modules/Approval'

const mapStateToProps = (state) => ({
  active : state.approval.active,
  list: state.approval.list,
  isBusy: state.approval.isBusy
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
  getList,
  inBusy
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalSearch)

