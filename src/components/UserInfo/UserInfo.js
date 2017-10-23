import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './UserInfo.scss'
import { getHighLightText } from '@/lib/base'

class UserInfo extends Component {
  static propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    isAdmin: PropTypes.bool,
    keyword: PropTypes.string
  }

  render () {
    const { name, avatar, isAdmin, keyword } = this.props
    return (
      <div className='wm-user-info'>
        <img className='avatar' src={avatar} />
        <span className='line'>
          { keyword
            ? <span
                dangerouslySetInnerHTML={getHighLightText(name, keyword)}
              />
            : <span>{name}</span>
          }
          {isAdmin && <i>超管</i>}
        </span>
      </div>
    )
  }
}

export default UserInfo
