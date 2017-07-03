import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountEditForm from '@/components/AccountEditForm'
import './SettingsEditAlipay.scss'
import { fetchData, goLocation, toast } from '@/lib/base'

class SettingsEditAlipay extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired
    // ,
    // updateAccount: PropTypes.func.isRequired
  }

  updateAccount = (val) => {
    let action = 'post /userAccounts/saveMyAccount.json'
    if (val.id) {
      action = 'post /userAccounts/updateMyAccount.json' 
    }
    fetchData(action, {
      type: 2,
      bankName: '支付宝',
      ...val
    })
    .then((data) => {
      if (data.result === 0) {
        goLocation({
          pathname: '/settings/accounts'
        })
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
        targetId={query.id} />
    )
  }
}

export default SettingsEditAlipay

