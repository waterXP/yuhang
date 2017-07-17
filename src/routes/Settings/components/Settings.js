import React, { Component } from 'react'
import { Link } from 'react-router'
// import SettingsAccountsRoute from '../../SettingsAccounts'
import './Settings.scss'
import { history } from '@/lib/base'

class Settings extends Component {

  render(){
    let children =this.props.children

    return (
      <div className='wm-settings'>
        { children ? children :
          <ul>
             <li className='a-link'><Link to="/settings/accounts" activeClassName='active'>个人收款账号</Link></li>
          </ul>
        }
      </div>
    )
  }
  componentDidMount(){
    const { location } = this.props
    if(location.pathname==='/settings'){
      history.replace('/settings/accounts')
    }
  }
}

export default Settings
