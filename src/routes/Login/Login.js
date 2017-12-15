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
    clearUserInfo: PropTypes.func
  }

  componentWillMount () {
    this.props.clearUserInfo()
  }

  render () {
    const { loginFail, login, children } = this.props
    const result = children
      ? <div>{ children }</div>
      : <div className='yh-login'>
          <div className='logo'></div>
          <LoginForm
            loginFail={loginFail}
            login={login}
            forgetPassword={() => goLocation('/login/forget')}
            register={() => goLocation('/login/register')}
          />
        </div>
    return result
  }
}

export default Login
