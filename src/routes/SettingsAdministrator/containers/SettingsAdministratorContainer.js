import { connect } from 'react-redux'
import { setStep } from '../../Settings/modules/settings'

import SettingsAdministrator from '../components/SettingsAdministrator'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  setStep
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAdministrator)

