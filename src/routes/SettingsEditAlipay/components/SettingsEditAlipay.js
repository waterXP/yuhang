import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountEditForm from '@/components/AccountEditForm'
import './SettingsEditAlipay.scss'
import { fetchData, goLocation, toast, regPhone, regMail, dingSetTitle } from '@/lib/base'
import { isDev } from '@/config'
import DevButtons from '@/components/DevButtons'

class SettingsEditAlipay extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired
  }

  constructor () {
    super(...arguments)
    this.deleteAccount = this::this.deleteAccount
    this.devClicks = this::this.devClicks
  }
  componentDidMount () {
    let title = ''
    if (this.props.query.id && !this.props.query.from) {
      title = '编辑支付宝'
    } else {
      title = '新增支付宝'
    }
    dingSetTitle(title)
  }

  deleteAccount () {
    confirm('确定要删除选择的银行卡吗？', '', () => {
      const id = +this.props.query.id
      fetchData('get /userAccounts/deleteMyAccount.json', { id })
      .then((data) => {
        if (data.result === 0) {
          window.history.back()
          // goLocation({
          //   pathname: '/settings/accounts'
          // })
        } else {
          toast(data.msg)
        }
      })
    })
  }
  devClicks () {
    this.deleteAccount()
  }

  updateAccount = (val) => {
    let action = 'post /userAccounts/saveMyAccount.json'
    if (val.id) {
      action = 'post /userAccounts/updateMyAccount.json'
    }
    let { chooseBankName, name, oldAccount, oldChooseBankName } = val
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
          window.history.back()
          // goLocation({
          //   pathname: '/settings/accounts'
          // })

        }
      } else {
        toast(data.msg)
      }
    })
  }
  render () {
    const { query } = this.props
    return (
      <div>
        { isDev && query.id && !query.from && <DevButtons titles={['删除']} handleClick={this.devClicks} />}
        <AccountEditForm
          className='wm-settings-edit-alipay'
          onSubmit={this.updateAccount}
          type={2}
          targetId={query.from ? 0 : +query.id}
          fromPage={query.from || ''}
        />
      </div>
    )
  }
}

export default SettingsEditAlipay

