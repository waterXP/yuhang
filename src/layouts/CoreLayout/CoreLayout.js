import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './CoreLayout.scss'
import '@/styles/core.scss'
import { goLocation } from '@/lib/base'

import NotificationContainer from '@/containers/NotificationContainer'
import NavigationContainer from '@/containers/NavigationContainer'
import SidebarContainer from '@/containers/SidebarContainer'

class CoreLayout extends Component {
  static propTypes = {
    children : PropTypes.element,
    location: PropTypes.object,
    userInfo: PropTypes.object
  }

  constructor () {
    super(...arguments)
    this.checkPath = this::this.checkPath
  }

  componentWillMount () {
    this.checkPath()
  }
  componentDidUpdate () {
    this.checkPath()
  }

  checkPath () {
    const { children, userInfo, location } = this.props
    const { pathname } = location
    if (!children) {
      goLocation('/login', true)
    } else if (
      userInfo.username === undefined &&
      pathname !== '/' &&
      pathname.indexOf('/login') !== 0) {
      goLocation('/login')
    } else if (
      userInfo.username !== undefined &&
      pathname.indexOf('/login') === 0) {
      goLocation('/account')
    }
  }

  render () {
    const { children, location } = this.props
    const { pathname } = location
    const hasBar = pathname.indexOf('/login') !== 0
    return (
      <div className='container text-center'>
        <NotificationContainer />
        <NavigationContainer />
        <div className='core-layout__viewport'>
          { hasBar && <SidebarContainer /> }
          <div className={hasBar ? 'right-layout' : 'full-layout'}>{ children }</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.root.userInfo
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
