import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/settingsAccountEdit'

import SettingsAccountEdit from '../components/SettingsAccountEdit'

const mapStateToProps = (state) => ({
  // settingsAccountEdit : state.settingsAccountEdit
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAccountEdit)

