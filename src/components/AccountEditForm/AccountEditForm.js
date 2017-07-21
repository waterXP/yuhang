import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, initialize } from 'redux-form'
import InputText from '../InputText'
import FormButton from '../FormButton'
import { fetchData, goLocation, toast } from '@/lib/base'
import './AccountEditForm.scss'

class AccountEditForm extends Component {
  static propTypes = {
    targetId: PropTypes.string,
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    type: PropTypes.number,
    onSubmit: PropTypes.func,
    fromPage: PropTypes.string
  }
  constructor () {
    super()
    this.initial = this.initial.bind(this)
    this.state = {
      account: 0,
      oldChooseBankName: 0
    }
  }
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
        this.setState({
          account: data.data.account,
          oldChooseBankName: data.data.chooseBankName
        })
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
  deleteHandle (id) {
    return () => this.deleteAccount(id)
  }

  render () {
    const { handleSubmit, pristine, submitting, type,
      onSubmit, targetId, fromPage } = this.props
    const isBankAccount = type === 1
    let oldAccount = this.state.account
    let oldChooseBankName = this.state.oldChooseBankName
    return (
      <form className='wm-account-edit-form' onSubmit={handleSubmit}>
        <InputText
          label='姓名'
          name='name'
          id='field-name'
          maxLength='10'
        />
        <InputText
          label='账号'
          name='chooseBankName'
          id='field-chooseBankName'
          maxLength={isBankAccount ? 22 : 50}
        />
        {isBankAccount &&
          <InputText
            label='银行名称'
            name='bankName'
            id='field-bank-name'
            maxLength='50'
          />
        }
        {isBankAccount &&
          <InputText
            label='开户行名称'
            name='bankBranchName'
            id='field-bank-branch-name'
            maxLength='50'
          />
        }
        {isBankAccount &&
          <InputText
            label='开户行行号'
            name='bankCode'
            id='field-bank-code'
            maxLength='20'
          />
        }
        <FormButton
          disabled={pristine || submitting}
          text='保存为默认'
          onClick={handleSubmit(values =>
            onSubmit({
              ...values,
              oldAccount,
              oldChooseBankName,
              fromPage,
              isDefault: 1
            })
          )} />
        <FormButton
          disabled={pristine || submitting}
          text='保存'
          onClick={handleSubmit(values =>
            onSubmit({
              ...values,
              oldAccount,
              oldChooseBankName,
              fromPage,
              isDefault: 0
            })
          )} />
        {targetId && <FormButton
          disabled={pristine || submitting}
          text='删除'
          onClick={this.deleteHandle(targetId)} />}
      </form>
    )
  }
}

export default connect(
  state => ({ initialValues: {} })
)(reduxForm({
  form: 'accountEditForm'
})(AccountEditForm))
