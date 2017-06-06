import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputText from '../../../components/InputText'
import FormButton from '../../../components/FormButton'
import './SettingsEditAccount.scss'

class SettingsEditAccount extends Component {
  static propTypes = {
    name: PropTypes.string,
    account: PropTypes.string,
    bankName: PropTypes.string,
    bankCode: PropTypes.string,
    getAccountDetail: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getAccountDetail()
  }

  render () {
    const props = this.props || {}
    return (
      <div className='wm-settings-edit-account'>
        <InputText label='姓名' id='m-name' value={props.name} />
        <InputText label='银行账号' id='m-account' value={props.account} />
        <InputText label='开户行名称' id='m-bank-name' value={props.bankName} />
        <InputText label='开户行行号' id='m-bank-id' value={props.bankCode} />
        <FormButton text='保存为默认' />
        <FormButton text='保存' />
        <FormButton text='删除' />
      </div>
    )
  }
}

export default SettingsEditAccount

