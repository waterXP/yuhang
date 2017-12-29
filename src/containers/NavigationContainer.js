import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Navigation.scss'


import { goLocation } from '@/lib/base'

import MainMenu from '../components/MainMenu'
import LoginInfo from '../components/LoginInfo'

import { setLanguage } from '@/store/root'
import { logout } from '@/routes/Login/modules/login'

class NavigationContainer extends Component {
  static propTypes = {
    userinfo: PropTypes.object,
    language: PropTypes.string,
    logout: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.handleRegister = this::this.handleRegister
    this.handleLogin = this::this.handleLogin
    this.handleLogout = this::this.handleLogout
    this.handleLanguage = this::this.handleLanguage
  }

  handleRegister () {
    goLogin('/login/register')
  }
  handleLogin () {
    goLogin('/login')
  }
  handleLogout () {
    this.props.logout()
    goLocation('/login')
  }
  handleLanguage (language) {
    this.props.setLanguage(language)
  }

  render () {
    const { userinfo, language } = this.props
    return (
      <div className='yh-navigation'>
        <button className='dropDownMenu'>
          <i className='fas fa-bars'/>&nbsp;菜单
        </button>
        <img className='logo' src='/assets/logo.png' />
        <MainMenu />
        <LoginInfo
          username={userinfo.name}
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
  userinfo: state.login && state.login.userinfo ? state.login.userinfo : {},
  language: state.root.language
})

const mapDispatchToProps = {
  logout,
  setLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer)
