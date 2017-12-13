import { connect } from 'react-redux'
import SettingsEditAlipay from '../components/SettingsEditAlipay'
import {
  getBankInfo, clearBankInfo
} from '../../Settings/modules/settings'

const mapStateToProps = (state) => ({
  query: state.location.query,
  bankInfo: state.settings.bankInfo
})

const mapDispatchToProps = {
  getBankInfo, clearBankInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditAlipay)
