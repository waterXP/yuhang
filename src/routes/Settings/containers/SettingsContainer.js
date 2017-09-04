import { connect } from 'react-redux'
import { setStep } from '../modules/settings'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/settings'

import Settings from '../components/Settings'

const mapStateToProps = (state) => ({
  // settings : state.settings
  step: state.settings.step
})

const mapDispatchToProps = {
  setStep
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

