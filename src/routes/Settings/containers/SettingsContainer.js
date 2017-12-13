import { connect } from 'react-redux'
import { setStep, getUserInfo } from '../modules/settings'
import { getAlipaySwitch } from '../../../store/root'

import Settings from '../components/Settings'

const mapStateToProps = (state) => ({
  step: state.settings.step,
  userInfo: state.settings.userInfo
})

const mapDispatchToProps = {
  setStep,
  getUserInfo,
  getAlipaySwitch
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
