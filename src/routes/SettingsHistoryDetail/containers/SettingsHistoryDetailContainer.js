import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/SettingsHistoryDetail'

import SettingsHistoryDetail from '../components/SettingsHistoryDetail'

const mapStateToProps = (state) => ({
  // SettingsHistoryDetail : state.SettingsHistoryDetail
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHistoryDetail)

