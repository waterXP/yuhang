import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import './Settings.scss'
import { history, dingSetTitle, dingSetNavRight, toast } from '@/lib/base'

class Settings extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children : PropTypes.element
  }

  componentDidMount () {
    this.checkUrl()
  }
  componentDidUpdate () {
    this.checkUrl()
  }

  checkUrl () {
    const { location } = this.props
    if (location.query.state === 'fin') {
      toast('设置成功', 'success')
      history.replace('/settings')
    }
    dingSetTitle('我的')
    dingSetNavRight('')
  }

  render () {
    let children = this.props.children
    return (
      <div className='wm-settings'>
        { children ||
          <ul>
            <li className='a-link'>
              <Link to='/settings/accounts' activeClassName='active'>
                <span className='fa fa-credit-card' />个人收款账号
              </Link>
            </li>
            <li className='a-link'>
              <Link to='/settings/administrator' activeClassName='active'>
                <span className='fa fa-user' />超管设置
              </Link>
            </li>
          </ul>
        }
      </div>
    )
  }
}

export default Settings
