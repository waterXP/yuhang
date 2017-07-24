import { connect } from 'react-redux'
import { getHistoryDetail, addComment } from '../modules/HomeHistoryDetail'
import { detailLoading } from '../../HomeApproveDetail/modules/HomeApproveDetail'

import HomeHistoryDetail from '../components/HomeHistoryDetail'

const mapStateToProps = (state) => ({
  historyDetail: state.home.historyDetail,
  query: state.location.query,
  isLoading: state.home.isLoading
})

const mapDispatchToProps = {
  getHistoryDetail,
  addComment,
  detailLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHistoryDetail)

