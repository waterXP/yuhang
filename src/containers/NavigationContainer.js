import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Navigation.scss'

import { goLocation } from '@/lib/base'

// import MainMenu from '../components/MainMenu'
import LoginInfo from '../components/LoginInfo'

import { setLanguage } from '@/store/root'
import { logout } from '@/routes/Login/modules/login'

class NavigationContainer extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    language: PropTypes.string,
    logout: PropTypes.func,
    pathname: PropTypes.string,
    setLanguage: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.handleRegister = this::this.handleRegister
    this.handleLogin = this::this.handleLogin
    this.handleLogout = this::this.handleLogout
    this.handleLanguage = this::this.handleLanguage
  }

  handleRegister () {
    if (this.props.pathname !== '/login/register') {
      goLocation('/login/register')
    }
  }
  handleLogin () {
    if (this.props.pathname !== '/login') {
      goLocation('/login')
    }
  }
  handleLogout () {
    this.props.logout(() => {
      if (this.props.pathname !== '/login') {
        goLocation('/login')
      }
    })
  }
  handleLanguage (language) {
    this.props.setLanguage(language)
  }

  render () {
    const { userInfo, language } = this.props
    return (
      <div className='yh-navigation'>
        {
          //   <button className='dropDownMenu'>
          //   <i className='fas fa-bars'/>&nbsp;菜单
          // </button>
        }
        <img className='logo' src='/assets/logo.png' />
        {
          // <MainMenu />
        }
        <LoginInfo
          username={userInfo.username}
          language={language}
          handleRegister={this.handleRegister}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          handleLanguage={this.handleLanguage}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.root.userInfo,
  language: state.root.language,
  pathname: state.location.pathname
})

const mapDispatchToProps = {
  logout,
  setLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer)
