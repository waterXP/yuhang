import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goLocation } from '@/lib/base'
import Account from '../Account'
import testImg from '@/routes/SettingsAccounts/assets/Duck.jpg'
import './AccountList.scss'

class AccountList extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
      bankBranchName: PropTypes.string,
      bankName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isDefault: PropTypes.number.isRequired,
      account: PropTypes.string.isRequired
    }).isRequired).isRequired
  }

  render () {
    return (
      <ul className='wm-accounts-list'>
        {this.props.accounts.map((account) => {
          const pathname = account.type === 1
            ? 'settings/edit/account'
            : 'settings/edit/alipay'
          return <li
            key={ account.id }
            onClick={ goLocation.bind(this, {
              pathname,
              query: {
                id: account.id
              }
            }) }>
            <div>
              <h5>{ account.bankName }&nbsp;{ account.isDefault && <i className='fa fa-check wm-color-correct' /> }</h5>
              <Account content={account.account} chooseBankName={account.chooseBankName} type={account.type} />
            </div>
          </li>
        })}
      </ul>
    )
  }
}

export default AccountList
