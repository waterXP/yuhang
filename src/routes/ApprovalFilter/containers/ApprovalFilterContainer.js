import { connect } from 'react-redux'

import ApprovalFilter from '../components/ApprovalFilter'

import { updateFilter, updateBillRange } from '../modules/ApprovalFilter'

const mapStateToProps = (state) => ({
  filter: state.approval.filter,
  billRange: state.approval.billRange
})

const mapDispatchToProps = {
  updateFilter,
  updateBillRange
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalFilter)

