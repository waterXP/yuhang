import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './UserInfo.scss'

class UserInfo extends Component {
  static propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    isAdmin: PropTypes.bool
  }
  render () {
    const { name, avatar, isAdmin } = this.props
    return (
      <div className='wm-user-info'>
        <i className={`fa fa-${isAdmin ? 'circle' : 'circle-thin'}`} />
        <img src={avatar} />
        <span>{ name }</span>
      </div>
    )
  }
}

export default UserInfo
