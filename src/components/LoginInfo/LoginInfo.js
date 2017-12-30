import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './LoginInfo.scss'

// import { userCenterLink, rateLink, searchLink } from '@/lib/enums'

class LoginInfo extends Component {
  static propTypes = {
    username: PropTypes.string,
    // language: PropTypes.string,
    // handleLanguage: PropTypes.func,
    handleRegister: PropTypes.func,
    handleLogin: PropTypes.func,
    handleLogout: PropTypes.func
  }

  render () {
    const { username, handleRegister, handleLogin, handleLogout } = this.props
    // language, handleLanguage,
    /*
    const langauage =
      <span>
        {
          language === 'ch'
          ? <span>中文</span>
          : <a
            key='ch'
            onClick={() => handleLanguage('ch')}
          >中文</a>
        }
        /
        {
          language === 'en'
          ? <span>EN</span>
          : <a
            key='ch'
            onClick={() => handleLanguage('en')}
          >EN</a>
        }
      </span>
    */
    const result = username
      ? <div className='yh-login-info'>
        {
        // <a href={searchLink} target='_blank'>
        //   <i className='fas fa-search' />
        // </a>
        // <a href={rateLink} target='_blank'>优惠套餐</a>
        }
        <span className='username'>你好，{ username }</span>
        <a onClick={handleLogout}>退出</a>
        {
          //   <a
          //   href={userCenterLink}
          //   target='_blank'
          // >用户中心</a>
          // { langauage }
        }
      </div>
      : <div className='yh-login-info'>
        {
        // <a href={searchLink} target='_blank'>
        //   <i className='fas fa-search' />
        // </a>
        // <a href={rateLink} target='_blank'>优惠套餐</a>
        }
        <a onClick={handleRegister}>注册</a>
        <a onClick={handleLogin}>登入</a>
        {
        //   <a
        //   href={userCenterLink}
        //   target='_blank'
        // >用互中心</a>
        // { langauage }
        }
      </div>
    return result
  }
}

export default LoginInfo
