import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountEditForm from '@/components/AccountEditForm'
import './SettingsEditAccount.scss'
import { fetchData, goLocation, toast, regAccount, dingSetTitle } from '@/lib/base'

class SettingsEditAccount extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired
  }

  updateAccount = (val) => {
    let action = 'post /userAccounts/saveMyAccount.json'
    if (val.id) {
      action = 'post /userAccounts/updateMyAccount.json'
    }
    let { name, chooseBankName, bankBranchName, bankCode, bankName, oldAccount, oldChooseBankName } = val
    if (oldChooseBankName && chooseBankName === oldChooseBankName) {
      val.account = oldAccount
    } else {
      val.account = chooseBankName
    }
    let account = val.account
    if (!name) {
      toast('姓名不能为空')
      return
    } else if (name.length > 30) {
      toast('姓名太长')
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
    // if (!bankCode) {
    //   toast('请输入支行行号')
    //   return
    // }

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
  componentDidMount () {
    let title = ''
    if (this.props.query.id) {
      title = '编辑银行卡号'
    } else {
      title = '新增银行卡号'
    }
    dingSetTitle(title)
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
