import { connect } from 'react-redux'

import ApprovalFilter from '../components/ApprovalFilter'

import { getList, inBusy } from '@/routes/Approval/modules/Approval'

const mapStateToProps = (state) => ({
  query: state.location.query,
  list: state.approval.list,
  isBusy: state.approval.isBusy
})


const mapDispatchToProps = {
  getList,
  inBusy
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalFilter)

