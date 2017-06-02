import React, { Component } from 'react'
import { Link } from 'react-router'
import SettingsAccountsRoute from '../../SettingsAccounts'
import './Settings.scss'

export const Settings = ({ children }) => (
  <div className='wm-settings'>
    {children ? children :
       <ul>
         <li className='a-link'><Link to="/settings/accounts" activeClassName='active'>个人收款账号</Link></li>
         <li className='a-link'><Link to="/settings/history">发放历史记录</Link></li>
       </ul>
     }
  </div>
)

export default Settings

