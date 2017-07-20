import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goLocation } from '@/lib/base'
import Account from '../Account'
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

  gotoPage (location) {
    return () => goLocation(location)
  }

  render () {
    const { accounts } = this.props
    let list = [
      ...accounts.filter((v) => v.isDefault),
      ...accounts.filter((v) => !v.isDefault)
    ]
    console.log(list)
    return (
      <ul className='wm-accounts-list'>
        {list.map((account) => {
          const pathname = account.type === 1
            ? 'settings/edit/account'
            : 'settings/edit/alipay'
          return <li
            key={account.id}
            onClick={this.gotoPage({
              pathname,
              query: {
                id: account.id
              }
            })}>
            <div>
              <h5>
                { account.bankName }
                &nbsp;
                { account.isDefault
                  ? <span className='wm-color-primary'>默认</span>
                  : ''
                }
              </h5>
              <Account
                content={account.account}
                chooseBankName={account.chooseBankName}
                type={account.type}
              />
            </div>
          </li>
        })}
      </ul>
    )
  }
}

export default AccountList
