import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountEditForm from '@/components/AccountEditForm'
import './SettingsEditAccount.scss'
import { fetchData, goLocation, toast, regAccount } from '@/lib/base'

class SettingsEditAccount extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired
  }

  updateAccount = (val) => {
    let action = 'post /userAccounts/saveMyAccount.json'
    if (val.id) {
      action = 'post /userAccounts/updateMyAccount.json'
    }
    let { name, account, bankBranchName, bankCode, bankName } = val
    if (!name) {
      toast('姓名不能为空')
      return
    } else if (name.length > 10) {
      return
    }
    if (!account) {
      toast('账号不能为空')
      return
    } else if (regAccount.test(account)) {
    } else {
      toast('账号不正确')
      return
    }
    if (!bankName) {
      toast('请输入银行名称')
      return
    }
    if (!bankBranchName) {
      toast('请输入支行名称')
      return
    }
    if (!bankCode) {
      toast('请输入支行行号')
      return
    }

    fetchData(action, {
      type: 1,
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
        className='wm-settings-edit-account'
        onSubmit={this.updateAccount}
        type={1}
        targetId={query.id}
        fromPage={query.from || ''}
      />
    )
  }
}

export default SettingsEditAccount
