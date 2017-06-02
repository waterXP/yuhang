import { connect } from 'react-redux'
import { getAccounts } from '../modules/SettingsAccounts'

import SettingsAccounts from '../components/SettingsAccounts'

const mapStateToProps = (state) => ({
  accounts: state.settings.accounts
})

const mapDispatchToProps = {
  getAccounts
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAccounts)

