import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Approval.scss'
import { history } from '@/lib/base'

class Approval extends Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.element
  }
  checkUrl () {
    const { location } = this.props
    if (location.pathname === '/approval' || location.pathname === '/approval/') {
      history.replace('/approval/main')
    }
  }
  componentDidMount () {
    this.checkUrl()
  }
  componentDidUpdate() {
    this.checkUrl()
  }
  render () {
    const { children } = this.props
    return (
      <div className='wm-approval'>
        { children }
      </div>
    )
  }
}

export default Approval
