import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CoreLayout.scss'
import '@/styles/core.scss'
import { goLocation } from '@/lib/base'

import NotificationContainer from '@/containers/NotificationContainer'
import NavigationContainer from '@/containers/NavigationContainer'
import SidebarContainer from '@/containers/SidebarContainer'

class CoreLayout extends Component {
  static propTypes = {
    children : PropTypes.element,
    location: PropTypes.object
  }

  componentWillMount () {
    if (!this.props.children) {
      goLocation('/login', true)
    }
  }
  componentDidUpdate () {
    if (!this.props.children) {
      goLocation('/login', true)
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

export default CoreLayout
