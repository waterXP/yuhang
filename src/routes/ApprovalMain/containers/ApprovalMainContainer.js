import { connect } from 'react-redux'

import ApprovalMain from '../components/ApprovalMain'
import { updateActive } from '../../Approval/modules/Approval'

const mapStateToProps = (state) => ({
  active : state.approval.active,
  list: state.approval.list,
  isBusy: state.approval.isBusy,
  location: state.location
})

const mapDispatchToProps = {
  updateActive
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalMain)

