import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalNav.scss'
// import testImg from '@/routes/SettingsAccounts/assets/Duck.jpg'

class ApprovalNav extends Component {
  static propTypes = {
    active: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    name: PropTypes.string,
    title: PropTypes.string
  }
  clickHandle () {
    return () => this.props.handleClick()
  }
  render () {
    const { active, name, title, imgsrc } = this.props
    return (
      <li className={`wm-approval-nav${active && ' active'}`} >
        <a href='javascript:;' onClick={this.clickHandle()}>
          <img
            src={imgsrc}
            alt={title}
            className='nav-btn'
          />
          <p>{ name }</p>
        </a>
      </li>
    )
  }
}

export default ApprovalNav
