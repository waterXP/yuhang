import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/SettingsHistory'

import SettingsHistory from '../components/SettingsHistory'

const mapStateToProps = (state) => ({
  // SettingsHistory : state.SettingsHistory
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHistory)

