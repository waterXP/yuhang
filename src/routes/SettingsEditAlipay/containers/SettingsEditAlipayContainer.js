import { connect } from 'react-redux'
import { updateAccount } from '../modules/SettingsEditAlipay'

import SettingsEditAlipay from '../components/SettingsEditAlipay'

const mapStateToProps = (state) => ({
  query: state.location.query
})

const mapDispatchToProps = {
  updateAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditAlipay)
