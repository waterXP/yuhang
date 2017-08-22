import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserInfo from '../UserInfo'
import './UserList.scss'

class UserList extends Component {
  static propTypes = {
    setAdmin: PropTypes.func,
    title: PropTypes.string,
    list: PropTypes.array,
    admin: PropTypes.string,
    keyword: PropTypes.string
  }

  setAdmin = (id) => () => this.props.setAdmin(id)
  render () {
    const { title, list, admin, keyword } = this.props
    let datas = list
    if (keyword) {
      datas = list.filter((v) => ~v.nickName.indexOf(keyword))
    }
    return (
      <ul className='wm-user-list'>
        <li className='title'>{title}</li>
        {
          datas.map((v) =>
            <li key={v.id} onClick={this.setAdmin(v)}>
              <UserInfo
                name={v.nickName}
                avatar={v.avatar}
                isAdmin={admin === v.dingid}
              />
            </li>
          )
        }
      </ul>
    )
  }
}

export default UserList
