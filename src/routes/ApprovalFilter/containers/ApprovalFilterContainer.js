import { connect } from 'react-redux'

import ApprovalFilter from '../components/ApprovalFilter'

import { getList, inBusy, cleanList,
  setFilter } from '@/routes/Approval/modules/Approval'

const mapStateToProps = (state) => ({
  query: state.location.query,
  filter: state.approval.filter,
  range: state.approval.range
})

const mapDispatchToProps = {
  cleanList,
  setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalFilter)
