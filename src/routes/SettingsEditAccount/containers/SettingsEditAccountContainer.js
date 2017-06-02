import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/SettingsEditAccount'

import SettingsEditAccount from '../components/SettingsEditAccount'

const mapStateToProps = (state) => ({
  // SettingsEditAccount : state.SettingsEditAccount
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditAccount)

