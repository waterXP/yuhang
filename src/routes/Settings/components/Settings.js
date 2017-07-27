import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import './Settings.scss'
import { history, dingSetTitle, dingSetNavRight } from '@/lib/base'

class Settings extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children : PropTypes.element
  }

  componentDidMount () {
    const { location } = this.props
    if (location.pathname === '/settings') {
      history.replace('/settings/accounts')
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
            <li className='a-link'><Link to='/settings/accounts' activeClassName='active'>个人收款账号</Link></li>
          </ul>
        }
      </div>
    )
  }
}

export default Settings
