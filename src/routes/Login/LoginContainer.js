import { connect } from 'react-redux'
import Login from './Login'

import { login, clearUserInfo } from './modules/login'
import { toast } from '@/store/root'

const mapStateToProps = (state) => ({
  loginFail: state.login.loginFail,
  userInfo: state.login.userInfo,
  isBusy: state.root.isBusy
})
const mapDispatchToProps = {
  login,
  clearUserInfo,
  toast
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
