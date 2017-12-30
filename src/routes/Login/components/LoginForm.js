import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './LoginForm.scss'

import { getImageCode } from '@/lib/base'

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
    register: PropTypes.func,
    isBusy: PropTypes.bool,
    toast: PropTypes.func,
    isShowCode: PropTypes.bool
  }
  constructor () {
    super(...arguments)
    this.handleLogin = this::this.handleLogin
    this.getVCode = this::this.getVCode
    this.state = {
      username: '',
      password: '',
      vcode: '',
      imgSrc: ''
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props.isShowCode && !prevProps.isShowCode) {
      this.getVCode()
    }
  }

  handleLogin () {
    const { toast, login, isShowCode } = this.props
    const { username, password, vcode } = this.state
    if (!username) {
      toast('请输入姓名')
      return
    }
    if (!password) {
      toast('请输入密码')
      return
    }
    let params = { username, password }
    if (isShowCode) {
      if (!vcode) {
        toast('请输入验证码')
        return
      } else {
        params.vcode = vcode
      }
    }
    login(params)
  }
  getVCode () {
    getImageCode(imgSrc =>
      this.setState({ imgSrc })
    )
  }

  render () {
    const { loginFail, forgetPassword, register,
      isBusy, isShowCode } = this.props
    const { username, password, vcode, imgSrc } = this.state
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
            disabled={isBusy}
          />
          <InputText
            type='password'
            value={password}
            placeholder='密码'
            setValue={v => this.setState({ password: v })}
            disabled={isBusy}
          />
          {
            isShowCode && <InputText
              className='vcode-input'
              type='text'
              value={vcode}
              placeholder='验证码'
              setValue={v => this.setState({ vcode: v })}
              disabled={isBusy}
            />
          }
          {
            isShowCode && <button
              className='vcode-button'
              type='button'
              onClick={this.getVCode}
              disabled={isBusy}
            >
              { imgSrc ? <img src={imgSrc} /> : '获取图片' }
            </button>
          }
          <MainButton
            handleClick={this.handleLogin}
            disabled={isBusy}
          >
            { isBusy
                ? <span>
                  登录中&nbsp;
                  <i className='fas fa-circle-notch fa-spin' />
                </span>
                : '登录'
            }
          </MainButton>
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
