import { connect } from 'react-redux'
import { getHistoryDetail, addComment } from '../modules/SettingsHistoryDetail'

import SettingsHistoryDetail from '../components/SettingsHistoryDetail'

const mapStateToProps = (state) => ({
  historyDetail: state.home.historyDetail,
  query: state.location.query
})

const mapDispatchToProps = {
  getHistoryDetail,
  addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHistoryDetail)

