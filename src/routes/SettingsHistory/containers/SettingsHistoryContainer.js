import { connect } from 'react-redux'
import { getPaidHistory } from '../modules/SettingsHistory'

import SettingsHistory from '../components/SettingsHistory'

const mapStateToProps = (state) => ({
  paidHistory : state.settings.paidHistory,
  query: state.location.query
})

const mapDispatchToProps = {
  getPaidHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHistory)

