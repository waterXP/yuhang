import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Account from '../Account'
import testImg from '../../routes/SettingsAccounts/assets/Duck.jpg'
import './AccountList.scss'

class AccountList extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
      bankBranchName: PropTypes.string.isRequired,
      bankName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isDefault: PropTypes.number.isRequired,
      account: PropTypes.string.isRequired
    }).isRequired).isRequired
  }
  
  render () {
    return (
      <ul className='wm-accounts-list'>
        {this.props.accounts.map((account) =>
          <li key={account.id}>
            <img
              alt={account.bankName}
              className='icon'
              src={testImg} />
            <div>
              <h5>{account.bankName}</h5>
              <Account content={account.account} type={account.type} />
            </div>
          </li>
        )}
      </ul>
    )
  }
}

export default AccountList