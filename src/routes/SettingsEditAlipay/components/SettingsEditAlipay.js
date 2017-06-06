import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputText from '../../../components/InputText'
import FormButton from '../../../components/FormButton'
import './SettingsEditAlipay.scss'

class SettingsEditAlipay extends Component {
  static propTypes = {
    name: PropTypes.string,
    account: PropTypes.string
  }

  componentDidMount () {
    // this.props.getAccountDetail()
  }

  render () {
    const props = this.props || {}
    return (
      <div className='wm-settings-edit-alipay'>
        <InputText label='姓名' id='m-name' value={props.name} />
        <InputText label='账号' id='m-account' value={props.account} />
        <FormButton text='保存为默认' />
        <FormButton text='保存' />
      </div>
    )
  }
}

export default SettingsEditAlipay

