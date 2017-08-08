import { connect } from 'react-redux'
import { addComment, inBusy } from '@/routes/HomeHistoryDetail/modules/HomeHistoryDetail'

import HomeListComment from '../components/HomeListComment'

const mapStateToProps = (state) => ({
  // approvalDetail: state.approval.approvalDetail,
  query: state.location.query,
  isBusy: state.home.isBusy
})

const mapDispatchToProps = {
  addComment,
  inBusy
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeListComment)
