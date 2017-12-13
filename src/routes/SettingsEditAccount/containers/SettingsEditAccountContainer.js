import { connect } from 'react-redux'
import SettingsEditAccount from '../components/SettingsEditAccount'
import {
  getBankBranchs, getBankInfo, clearBankInfo
} from '../../Settings/modules/settings'

const mapStateToProps = (state) => ({
  query: state.location.query,
  bankInfo: state.settings.bankInfo
})

const mapDispatchToProps = {
  getBankBranchs, getBankInfo, clearBankInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditAccount)
