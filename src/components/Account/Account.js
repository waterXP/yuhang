import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Account.scss'

class Account extends Component {
  static propTypes = {
    content: PropTypes.string
  }

  render () {
    return (
      <div className='wm-account'>
        <p>{this.props.content}</p>
      </div>
    )
  }
}

export default Account
