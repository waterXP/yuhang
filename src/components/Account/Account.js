import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Account.scss'

class Account extends Component {
  static propTypes = {
    chooseBankName: PropTypes.string
  }

  render () {
    return (
      <div className='wm-account'>
        <label>账号</label><h6>{this.props.chooseBankName}</h6>
      </div>
    )
  }
}

export default Account
