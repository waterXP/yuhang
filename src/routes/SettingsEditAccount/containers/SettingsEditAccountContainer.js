import { connect } from 'react-redux'
import { updateAccount } from '../modules/SettingsEditAccount'

import SettingsEditAccount from '../components/SettingsEditAccount'

const mapStateToProps = (state) => ({
  query: state.location.query
})

const mapDispatchToProps = {
  updateAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditAccount)

