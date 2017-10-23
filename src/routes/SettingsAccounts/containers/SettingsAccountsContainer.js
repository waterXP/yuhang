import { connect } from 'react-redux'
import { getAccounts, initialAccounts,
  delAccounts } from '../modules/SettingsAccounts'

import SettingsAccounts from '../components/SettingsAccounts'

const mapStateToProps = (state) => ({
  accounts: state.settings.accounts
})

const mapDispatchToProps = {
  getAccounts,
  delAccounts,
  initialAccounts
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAccounts)
