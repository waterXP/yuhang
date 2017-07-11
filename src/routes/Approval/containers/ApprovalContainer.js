import { connect } from 'react-redux'
// import { getConfig } from '../../../store/root'

import Approval from '../components/Approval'
import { updateActive } from '../modules/Approval'

const mapStateToProps = (state) => ({
  active : state.approval.active,
  list: state.approval.list
})

const mapDispatchToProps = {
  updateActive
}

export default connect(mapStateToProps, mapDispatchToProps)(Approval)

