import { connect } from 'react-redux'
import { getAccounts, initialAccounts } from '../modules/SettingsAccounts'

import SettingsAccounts from '../components/SettingsAccounts'

const mapStateToProps = (state) => ({
  accounts: state.settings.accounts
})

const mapDispatchToProps = {
  getAccounts,
  initialAccounts
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAccounts)
