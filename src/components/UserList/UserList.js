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
    showTitle: PropTypes.bool,
    keyword: PropTypes.string
  }

  setAdmin = (id) => () => this.props.setAdmin(id)
  render () {
    const { title, list, admin, pos, showTitle, keyword } = this.props
    let datas = list
    return (
      <ul className={`wm-user-list${showTitle ? '': ' in-search'}`} ref={pos}>
        { showTitle && <li className='title'>{title}</li> }
        {
          datas.map((v) =>
            <li key={v.id} onClick={this.setAdmin(v)}>
              <UserInfo
                name={v.nickName}
                avatar={v.avatar}
                isAdmin={admin === v.dingid}
                keyword={keyword}
              />
            </li>
          )
        }
      </ul>
    )
  }
}

export default UserList
