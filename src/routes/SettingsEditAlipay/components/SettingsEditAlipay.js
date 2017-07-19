import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountEditForm from '@/components/AccountEditForm'
import './SettingsEditAlipay.scss'
import { fetchData, goLocation, toast, regPhone, regMail } from '@/lib/base'

class SettingsEditAlipay extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired
  }

  updateAccount = (val) => {
    let action = 'post /userAccounts/saveMyAccount.json'
    if (val.id) {
      action = 'post /userAccounts/updateMyAccount.json'
    }
    let { chooseBankName, name, oldAccount, oldChooseBankName } = val
    if (oldAccount && oldAccount === oldChooseBankName) {
      val.account = oldAccount
    } else {
      val.account = chooseBankName
    }
    let account = val.account
    if (!name) {
      toast('姓名不能为空')
      return
    } else if (name.length > 10) {
      return
    }
    if (!account) {
      toast('账号不能为空')
      return
    } else if (regPhone.test(account) || regMail.test(account)) {
    } else {
      toast('账号不正确')
      return
    }
    fetchData(action, {
      type: 2,
      bankName: '支付宝',
      ...val
    })
    .then((data) => {
      if (data.result === 0) {
        if (val.fromPage) {
          goLocation({
            pathname: val.fromPage,
            query: {
              from: '/settings/accounts'
            }
          })
        } else {
          goLocation({
            pathname: '/settings/accounts'
          })
        }
      } else {
        toast(data.msg)
      }
    })
  }

  render () {
    const { query } = this.props
    return (
      <AccountEditForm
        className='wm-settings-edit-alipay'
        onSubmit={this.updateAccount}
        type={2}
        targetId={query.id}
        fromPage={query.from || ''}
      />
    )
  }
}

export default SettingsEditAlipay

