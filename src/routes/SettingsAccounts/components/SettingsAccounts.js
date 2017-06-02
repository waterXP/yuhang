import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import PropTypes from 'prop-types'
import './SettingsAccounts.scss'
import AccountList from '../../../components/AccountList'

class SettingsAccounts extends Component {
  static propTypes = {
    getAccounts: PropTypes.func.isRequired,
    accounts: PropTypes.arrayOf(PropTypes.shape({
      bankBranchName: PropTypes.string.isRequired,
      bankName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isDefault: PropTypes.number.isRequired,
      account: PropTypes.string.isRequired
    }).isRequired).isRequired
  }

  componentDidMount () {
    this.props.getAccounts()
  }

  newAccount (type) {
    hashHistory.push({
      pathname: 'settings/edit/account'
    })
  }

  newAlipay (type) {
    hashHistory.push({
      pathname: 'settings/edit/alipay'
    })    
  }

  render () {
    return (
      <div className='wm-settings-accounts'>
        <button className='btn btn-default' onClick={this.newAlipay.bind(this)}>新增支付宝</button>
        <button className='btn btn-default' onClick={this.newAccount.bind(this)}>新增银行卡</button>
        <AccountList accounts={this.props.accounts} />
      </div>
    )
  }
}

export default SettingsAccounts

