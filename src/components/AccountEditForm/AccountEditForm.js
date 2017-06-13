import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, initialize } from 'redux-form'
import InputText from '../InputText'
import FormButton from '../FormButton'
import { fetchData, goLocation, toast } from '../../store/base'
import './AccountEditForm.scss'

class AccountEditForm extends Component {
  componentDidMount () {
    if (this.props.targetId) {
      this.initial(this.props.targetId)
    }
  }

  initial (id) {
    fetchData('get /userAccounts/updateMyAccount.json', { id })
    .then((data) => {
      if (!data.result) {
        this.props.dispatch(initialize('accountEditForm', data.data, true))
      } else {
        toast(data.msg)
      }
    })
  }

  deleteAccount (id) {
    fetchData('get /userAccounts/deleteMyAccount.json', { id })
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
    const { handleSubmit, pristine, submitting, type } = this.props
    const isBankAccount = type === 1
    return (
      <form className='wm-account-edit-form' onSubmit={handleSubmit}>
        <InputText label='姓名' name='name' id='field-name' />
        <InputText label='账号' name='account' id='field-account' />
        {isBankAccount && <InputText label='银行名称' name='bankName' id='field-bank-name' />}
        {isBankAccount && <InputText label='开户行名称' name='bankBranchName' id='field-bank-branch-name' />}
        {isBankAccount && <InputText label='开户行行号' name='bankCode' id='field-bank-code' />}
        <FormButton
          disabled={pristine || submitting}
          text='保存为默认'
          onClick={handleSubmit(values =>
            this.props.onSubmit({
              ...values,
              isDefault: 1
            })
          )} />
        <FormButton
          disabled={pristine || submitting}
          text='保存'
          onClick={handleSubmit(values =>
            this.props.onSubmit({
              ...values,
              isDefault: 0
            })
          )}  />
        {this.props.targetId && <FormButton
          disabled={pristine || submitting}
          text='删除'
          onClick={this.deleteAccount.bind(this, this.props.targetId)} />}
      </form>
    )
  }
}

// AccountEditForm = reduxForm({
//   form: 'accountEditForm'
// })(AccountEditForm)

// AccountEditForm = connect(
//   state => ({initialValues: {}})
// )(AccountEditForm)

export default connect(
  state => ({initialValues: {}})
)(reduxForm({
  form: 'accountEditForm'
})(AccountEditForm))
