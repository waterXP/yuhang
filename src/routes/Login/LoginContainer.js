import { connect } from 'react-redux'
import Login from './Login'

import { login, clearUserInfo } from './modules/login'

const mapStateToProps = (state) => ({
  loginFail: state.login.loginFail,
  userInfo: state.login.userInfo
})
const mapDispatchToProps = {
  login,
  clearUserInfo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
