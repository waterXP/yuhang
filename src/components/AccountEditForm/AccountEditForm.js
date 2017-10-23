import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InputText from '../InputText'
import FormButton from '../FormButton'
import { fetchData, goLocation, toast } from '@/lib/base'
import './AccountEditForm.scss'

class AccountEditForm extends Component {
  static propTypes = {
    targetId: PropTypes.any,
    type: PropTypes.number,
    onSubmit: PropTypes.func,
    fromPage: PropTypes.string
  }
  constructor () {
    super()
    this.initial = this::this.initial
    this.setValue = this::this.setValue
    this.checkValidate = this::this.checkValidate
    this.handleSubmit = this::this.handleSubmit
    this.state = {
      account: 0,
      oldChooseBankName: 0,
      data: {},
      params: {},
      defaultCard: 0
    }
  }
  componentDidMount () {
    const { targetId } = this.props
    if (targetId) {
      this.initial(targetId)
    }
  }

  initial (id) {
    fetchData('get /userAccounts/updateMyAccount.json', { id })
    .then((data) => {
      if (!data.result) {
        this.setState({
          oldAccount: data.data.account,
          oldChooseBankName: data.data.chooseBankName,
          data: { ...data.data },
          params: { ...data.data },
          defaultCard: data.data.isDefault
        })
      } else {
        toast(data.msg)
      }
    })
  }

  checkValidate () {
    const { type } = this.props
    const { params } = this.state
    if (
      !params.name ||
      !params.chooseBankName ||
      (
        type === 1 &&
        (
          !params.bankName ||
          !params.bankBranchName
        )
      )
    ) {
      return false
    }
    return true
  }

  setValue (e) {
    const el = e.target
    this.setState((prevState) => {
      const tm = Object.assign(
        {}, prevState, {
          params: Object.assign(
            {}, prevState.params, { [el.name]: el.value }
          )
        }
      )
      return tm
    })
  }

  handleSubmit (isDefault) {
    return () => {
      const { oldAccount, oldChooseBankName, params, defaultCard } = this.state
      const { fromPage, onSubmit } = this.props
      onSubmit({
        ...params,
        isDefault: defaultCard || isDefault,
        oldAccount,
        oldChooseBankName,
        fromPage,
        defaultCard
      })
    }
  }

  render () {
    const { type, onSubmit, targetId, fromPage } = this.props
    const { data } = this.state
    // console.log(data.name)
    const isBankAccount = type === 1
    let oldAccount = this.state.account
    let oldChooseBankName = this.state.oldChooseBankName
    const valid = this.checkValidate()
    return (
      <form className='wm-account-edit-form'>
        <InputText
          label='银行名称'
          name='name'
          maxLength='30'
          handleChange={this.setValue}
          defaultValue={data.name}
        />
        <InputText
          label='账号'
          name='chooseBankName'
          maxLength={isBankAccount ? 22 : 50}
          required={true}
          handleChange={this.setValue}
          defaultValue={data.chooseBankName}
        />
        {isBankAccount &&
          <InputText
            label='银行名称'
            name='bankName'
            maxLength='50'
            required={true}
            handleChange={this.setValue}
            defaultValue={data.bankName}
          />
        }
        {isBankAccount &&
          <InputText
            label='开户行'
            name='bankBranchName'
            maxLength='50'
            required={true}
            handleChange={this.setValue}
            defaultValue={data.bankBranchName}
          />
        }
        {isBankAccount &&
          <InputText
            label='开户行行号'
            name='bankCode'
            maxLength='20'
            handleChange={this.setValue}
            defaultValue={data.bankCode}
          />
        }
        <div className='btns'>
          <FormButton
            disabled={!valid}
            text='保存'
            onClick={this.handleSubmit(0)}
          />
          <FormButton
            disabled={!valid}
            text='保存为默认'
            onClick={this.handleSubmit(1)}
          />
        </div>
      </form>
    )
  }
}

export default AccountEditForm
