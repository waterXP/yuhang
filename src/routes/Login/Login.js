import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Login.scss'
import { goLocation } from '@/lib/base'

/**
 * private Components
 */
import LoginForm from './components/LoginForm'

class Login extends Component {
  static propTypes = {
    children: PropTypes.element,
    loginFail: PropTypes.bool,
    login: PropTypes.func,
    // clearUserInfo: PropTypes.func,
    isBusy: PropTypes.bool,
    toast: PropTypes.func,
    isShowCode: PropTypes.bool
  }

  componentWillMount () {
    // clear user info
    // this.props.clearUserInfo()
  }

  render () {
    const { loginFail, login, children, isBusy, toast, isShowCode } = this.props
    const result = children
      ? <div>{ children }</div>
      : <div className='yh-login'>
        <div className='login-panel'>
          <div className='logo'><img src='/assets/logo.png' /></div>
          <LoginForm
            loginFail={loginFail}
            login={login}
            forgetPassword={() => goLocation('/login/forget')}
            register={() => goLocation('/login/register')}
            isBusy={isBusy}
            toast={toast}
            isShowCode={isShowCode}
          />
        </div>
      </div>
    return result
  }
}

export default Login
