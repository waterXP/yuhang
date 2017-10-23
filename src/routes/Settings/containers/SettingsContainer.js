import { connect } from 'react-redux'
import { setStep, getUserInfo } from '../modules/settings'
// import { exampleNormal, exampleAsync, exampleFetch } from '../modules/settings'

import Settings from '../components/Settings'

const mapStateToProps = (state) => ({
  // settings : state.settings
  step: state.settings.step,
  userInfo: state.settings.userInfo
})

const mapDispatchToProps = {
  setStep,
  getUserInfo
  // exampleNormal,
  // exampleAsync,
  // exampleFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

