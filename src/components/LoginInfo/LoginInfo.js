import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './LoginInfo.scss'

import { userCenterLink, rateLink, searchLink } from '@/lib/enums'

class LoginInfo extends Component {
  static propTypes = {
    username: PropTypes.string,
    language: PropTypes.string,
    handleRegister: PropTypes.func,
    handleLogin: PropTypes.func,
    handleLogout: PropTypes.func,
    handleLanguage: PropTypes.func
  }

  render () {
    const { username, language, handleRegister, handleLogin, handleLougout,
      handleLanguage } = this.props
    const langauage = 
      <span><a
        key='ch'
        className={language === 'en' ? 'active' : undefined}
        onClick={() => handleLanguage('ch')}
      >中文</a>
      /
      <a
        key='en'
        className={language === 'ch' ? 'active' : undefined}
        onClick={() => handleLanguage('en')}
      >EN</a>
      </span>
    const result = username
      ? <div className='yh-login-info'>
        <a href={searchLink} target='_blank'>
          <i className='fas fa-search' />
        </a>
        <a href={rateLink} target='_blank'>优惠套餐</a>
        <span>你好，{ username }</span>
        <a onClick={handleLogout}>退出</a>
        <a
          href={userCenterLink}
          target='_blank'
        >用互中心</a>
        { langauage }
      </div>
      : <div className='yh-login-info'>
        <a href={searchLink} target='_blank'>
          <i className='fas fa-search' />
        </a>
        <a href={rateLink} target='_blank'>优惠套餐</a>
        <a onClick={handleRegister}>注册</a>
        <a onClick={handleLogin}>登入</a>
        <a
          href={userCenterLink}
          target='_blank'
        >用互中心</a>
        { langauage }
      </div>
    return result
  }
}

export default LoginInfo
