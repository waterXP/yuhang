import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalNav.scss'
import testImg from '@/routes/SettingsAccounts/assets/Duck.jpg'

class ApprovalNav extends Component {
  static propTypes = {
    active: PropTypes.string.isRequired
  }
  render () {
    const { handleClick, active, name, title } = this.props
    return (
      <li className={ `wm-approval-nav${active && ' active'}` } >
        <a href='javascript:;' onClick={ handleClick.bind(this) }>
          <img
            src={ testImg }
            alt={ title }
            className='nav-btn'
          />
          <p>{ name }</p>
        </a>
      </li>
    )
  }
}

export default ApprovalNav
