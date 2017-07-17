import { connect } from 'react-redux'

import ApprovalMain from '../components/ApprovalMain'
import { updateActive, inBusy, getList } from '../../Approval/modules/Approval'

const mapStateToProps = (state) => ({
  active : state.approval.active,
  list: state.approval.list,
  page: state.approval.page,
  isBusy: state.approval.isBusy,
  location: state.location,
  query: state.location.query
})

const mapDispatchToProps = {
  updateActive,
  inBusy,
  getList
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalMain)

