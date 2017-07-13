import { connect } from 'react-redux'

import ApprovalSearch from '../components/ApprovalSearch'
import { inBusy, getList, cleanList } from '@/routes/Approval/modules/Approval'

const mapStateToProps = (state) => ({
  list: state.approval.list,
  isBusy: state.approval.isBusy,
  query: state.location.query,
  page: state.approval.page
})

const mapDispatchToProps = {
  getList,
  inBusy,
  cleanList
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalSearch)

