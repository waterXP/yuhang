import { connect } from 'react-redux'

import ApprovalFilterResults from '../components/ApprovalFilterResults'

import { getList, inBusy, cleanList,
  setFilter } from '@/routes/Approval/modules/Approval'

const mapStateToProps = (state) => ({
  query: state.location.query,
  list: state.approval.list,
  isBusy: state.approval.isBusy,
  page: state.approval.page,
  filter: state.approval.filter,
  range: state.approval.range
})

const mapDispatchToProps = {
  getList,
  inBusy
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalFilterResults)
