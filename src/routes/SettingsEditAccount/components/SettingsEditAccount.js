import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountEditForm from '@/components/AccountEditForm'
import './SettingsEditAccount.scss'
import { fetchData, goLocation, toast } from '@/lib/base'

class SettingsEditAccount extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired
  }

  updateAccount = (val) => {
    let action = 'post /userAccounts/saveMyAccount.json'
    if (val.id) {
      action = 'post /userAccounts/updateMyAccount.json' 
    }    
    fetchData(action, {
      type: 1,
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
        className='wm-settings-edit-account'
        onSubmit={this.updateAccount}
        type={1}
        targetId={query.id} />
    )
  }
}

export default SettingsEditAccount
