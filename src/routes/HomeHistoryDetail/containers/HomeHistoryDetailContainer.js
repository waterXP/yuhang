import { connect } from 'react-redux'
import { getHistoryDetail, addComment } from '../modules/HomeHistoryDetail'

import HomeHistoryDetail from '../components/HomeHistoryDetail'

const mapStateToProps = (state) => ({
  historyDetail: state.home.historyDetail,
  query: state.location.query
})

const mapDispatchToProps = {
  getHistoryDetail,
  addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHistoryDetail)

