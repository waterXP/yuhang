import { connect } from 'react-redux'
import SettingsSetBranch from '../components/SettingsSetBranch'
import { setCurrentBankBranchInfo } from '../../Settings/modules/settings'

const mapStateToProps = (state) => ({
  query: state.location.query,
  bankBranchs: state.settings.bankBranchs
  // currentBankCode: state.settings.currentBankCode
})

const mapDispatchToProps = {
  // setCurrentBankBranchInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsSetBranch)

