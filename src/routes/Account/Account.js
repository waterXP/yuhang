import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Account.scss'

import { goLocation } from '@/lib/base'

class Account extends Component {
  static propTypes = {
    children: PropTypes.element,
    pathname: PropTypes.string
  }

  checkUrl () {
    const { pathname } = this.props
    if (pathname === '/account' || pathname === '/account/') {
      goLocation('/account/personal', true)
    }
  }
  componentWillMount () {
    this.checkUrl()
  }
  componentDidUpdate () {
    this.checkUrl()
  }

  render () {
    const { children } = this.props
    return <div className='yh-account'>
      { children }
    </div>
  }
}

export default Account
