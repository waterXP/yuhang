import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goLocation } from '@/lib/base'
import Account from '../Account'
import './AccountList.scss'
import bkDefault from './assets/bk_default_bank.png'

class AccountList extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
      bankBranchName: PropTypes.string,
      bankName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isDefault: PropTypes.number.isRequired,
      account: PropTypes.string.isRequired
    }).isRequired).isRequired,
    isTooLong: PropTypes.bool,
    listRef: PropTypes.func,
    inControl: PropTypes.bool,
    delList: PropTypes.object
  }

  constructor () {
    super(...arguments)
    this.clickCard = this::this.clickCard
    this.clickCircle = this::this.clickCircle
  }

  clickCard (pathname, id) {
    return () => {
      const { inControl } = this.props
      if (!inControl) {
        goLocation({
          pathname,
          query: { id }
        })        
      }
    }
  }
  clickCircle (id) {
    return () => this.props.setDelList(id)
  }

  render () {
    const { accounts, listRef, isTooLong,
      inControl, delList } = this.props
    let list = [
      ...accounts.filter((v) => v.isDefault),
      ...accounts.filter((v) => !v.isDefault)
    ]
    return (
      <ul
        className={`wm-accounts-list${isTooLong ? ' fixed' : ''}`}
        ref={listRef}
      >
        {list.map((account) => {
          const pathname = account.type === 1
            ? 'settings/edit/account'
            : 'settings/edit/alipay'
          return <li
            key={account.id}
            style={{background: `url(${bkDefault}) no-repeat 0/cover`}}
            onClick={this.clickCard(pathname, account.id)}>
            <div className='card'>
              { account.isDefault
                ? <span className='default'>默认</span>
                : ''
              }
              <p className='name'>{ account.bankName }</p>
              <p className='type'>储蓄卡</p>
              <Account content={account.seAccount} />
              {
                inControl &&
                <div className='cover'>
                  <div
                    className={`circle${delList[account.id] ? ' sel' : ''}`}
                    onClick={this.clickCircle(account.id)}
                  >
                    { delList[account.id] && <i className='fa fa-check' /> }
                  </div>
                </div>
              }
            </div>
          </li>
        })}
      </ul>
    )
  }
}

export default AccountList
