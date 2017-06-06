import { connect } from 'react-redux'
import { getAccountDetail, saveDefault } from '../modules/SettingsEditAccount'

import SettingsEditAccount from '../components/SettingsEditAccount'

const mapStateToProps = (state) => ({
  name: state.settings.currentAccount.name || '',
  account: state.settings.currentAccount.account || '',
  bankName: state.settings.currentAccount.bankName || '',
  bankCode: state.settings.currentAccount.bankCode || '',
  query: state.location.query
})

const mapDispatchToProps = {
  getAccountDetail,
  saveDefault
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditAccount)

