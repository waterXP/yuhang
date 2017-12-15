import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './LoginForm.scss'

/**
 * private Components
 */
import Cover from './Cover'

/**
 * public Components
 */
import InputText from '@/components/InputText'
import MainButton from '@/components/MainButton'

class LoginForm extends Component {
  static propTypes = {
    loginFail: PropTypes.bool,
    login: PropTypes.func,
    forgetPassword: PropTypes.func,
    register: PropTypes.func
  }
  constructor () {
    super(...arguments)
    this.handleLogin = this::this.handleLogin
    this.state = {
      username: '',
      password: ''
    }
  }

  handleLogin () {
    const { username, password } = this.state
    const { login } = this.props
    login(username, password)
  }

  render () {
    const { loginFail, forgetPassword, register } = this.props
    const { username, password } = this.state
    return <div className='yh-login-form'>
        <div className='content'>
          <Cover />
          <div className='login-form'>
            <p className='title'>用户登录</p>
            <p className='sub-title'>INNOVATION OF YUHANG</p>
            <p className='warning'>
              { loginFail &&
                <span>
                  <i className='fas fa-exclamation-circle' />
                  您的账号或密码输入错误，请重新填写
                </span>
              }&nbsp;
            </p>
            <InputText
              value={username}
              placeholder='账号'
              setValue={v => this.setState({ username: v })}
            />
            <InputText
              type='password'
              value={password}
              placeholder='密码'
              setValue={v => this.setState({ password: v })}
            />
            <MainButton handleClick={this.handleLogin}>登录</MainButton>
            <div className='hint'>
              <a className='help-link' onClick={forgetPassword}>忘记密码</a>
              <a className='help-link' onClick={register}>注册</a>
            </div>
          </div>
        </div>
      </div>
  }
}

export default LoginForm
