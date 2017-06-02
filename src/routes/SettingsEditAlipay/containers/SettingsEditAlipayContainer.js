import { connect } from 'react-redux'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/SettingsEditAlipay'

import SettingsEditAlipay from '../components/SettingsEditAlipay'

const mapStateToProps = (state) => ({
  // SettingsEditAlipay : state.SettingsEditAlipay
})

const mapDispatchToProps = {
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditAlipay)

