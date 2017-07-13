import { connect } from 'react-redux'

import ApprovalFilter from '../components/ApprovalFilter'

import { getList, inBusy, cleanList } from '@/routes/Approval/modules/Approval'

const mapStateToProps = (state) => ({
  query: state.location.query,
  list: state.approval.list,
  isBusy: state.approval.isBusy,
  page: state.approval.page
})


const mapDispatchToProps = {
  getList,
  inBusy,
  cleanList
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalFilter)

