import { connect } from 'react-redux'
import { getPaidHistory } from '../modules/SettingsHistory'

import SettingsHistory from '../components/SettingsHistory'

const mapStateToProps = (state) => ({
  // SettingsHistory : state.SettingsHistory
})

const mapDispatchToProps = {
  getPaidHistory
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHistory)

