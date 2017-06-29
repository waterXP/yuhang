import React, { Component } from 'react'
import { goLocation } from '../../../lib/base'
import PropTypes from 'prop-types'
import './SettingsAccounts.scss'
import AccountList from '../../../components/AccountList'

class SettingsAccounts extends Component {
  static propTypes = {
    getAccounts: PropTypes.func.isRequired,
    initialAccounts: PropTypes.func.isRequired,
    accounts: PropTypes.arrayOf(PropTypes.shape({
      bankBranchName: PropTypes.string,
      bankName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isDefault: PropTypes.number.isRequired,
      account: PropTypes.string.isRequired
    }).isRequired).isRequired
  }

  componentWillMount () {
    this.props.initialAccounts()    
  }

  componentDidMount () {
    this.props.getAccounts()
  }

  render () {
    return (
      <div className='wm-settings-accounts'>
        <button
          className='btn btn-default'
          onClick={goLocation.bind(this, {
            pathname: 'settings/edit/alipay'
          })}>新增支付宝</button>
        <button
          className='btn btn-default'
          onClick={goLocation.bind(this, {
            pathname: 'settings/edit/account'
          })}>新增银行卡</button>
        <AccountList accounts={this.props.accounts} />
      </div>
    )
  }
}

export default SettingsAccounts

