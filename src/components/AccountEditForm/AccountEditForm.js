import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InputText from '../InputText'
import SelectCity from '../SelectCity'
import InputButton from '../InputButton'
import FormButton from '../FormButton'
import { fetchData, goLocation, removeQuery } from '@/lib/base'
import { toast } from '@/lib/ddApi'
import './AccountEditForm.scss'

class AccountEditForm extends Component {
  static propTypes = {
    type: PropTypes.string,
    targetId: PropTypes.number,
    getBankBranchs: PropTypes.func,
    query: PropTypes.object,
    bankParams: PropTypes.object,
    setParams: PropTypes.func,
    editAccount: PropTypes.func,
    saveAccount: PropTypes.func
  }
  constructor () {
    super(...arguments)
    this.focusInput = this::this.focusInput
    this.setProvince = this::this.setProvince
    this.setCity = this::this.setCity
    this.setBankBranch = this::this.setBankBranch
    this.getBankBranchs = this::this.getBankBranchs
  }

  focusInput (target) {
    this[`${target}Ref`] && this[`${target}Ref`].focus()
  }
  setProvince (v) {
    const { setParams, bankParams } = this.props
    const province = v === '选择省份' ? '' : v
    if (bankParams.province !== province) {
      setParams({
        province, city: '', bankBranchName: ''
      })
    }
  }
  setCity (v) {
    const { setParams, bankParams } = this.props
    const city = v === '选择城市' ? '' : v
    if (bankParams.city !== city) {
      setParams({
        city,
        bankBranchName: ''
      })
    }
  }
  getBankBranchs () {
    const { getBankBranchs, bankParams, query } = this.props
    const { city, province, bankName } = bankParams
    if (city && province) {
      getBankBranchs(
        { city, province, bankName: bankName || '' },
        () => goLocation({
          pathname: '/settings/edit/account/branch',
          query
        })
      )
    }
  }
  setBankBranch () {
    const { city, province } = this.props.bankParams
    if (!city || !province) {
      toast('请先选择地区')
      return
    }
    this.getBankBranchs()
  }

  render () {
    const { type, targetId, getBankBranchs, bankParams, setParams,
      editAccount, saveAccount } = this.props
    const isBankAccount = type === 'account'
    return (
      <form className='wm-account-edit-form'>
        <InputText
          label='姓名'
          name='name'
          maxLength='30'
          required={true}
          handleChange={(v) => setParams({ name: v })}
          value={bankParams.name}
          placeholder='请输入姓名'
          inputRef={(el) => this.nameRef = el}
        />
        <InputText
          label='账号'
          name='seAccount'
          maxLength={isBankAccount ? 22 : 50}
          required={true}
          handleChange={(v) => setParams({ seAccount: v })}
          handleClick={() => !bankParams.accountEdited && editAccount()}
          value={bankParams.seAccount}
          placeholder='请输入账号'
          inputRef={(el) => this.accountRef = el}
        />
        {isBankAccount &&
          <InputText
            label='银行名称'
            name='bankName'
            maxLength='50'
            required={true}
            handleChange={(v) => setParams({ bankName: v })}
            value={bankParams.bankName}
            placeholder='请输入银行名称'
            inputRef={(el) => this.bankNameRef = el}
          />
        }
        {isBankAccount &&
          <SelectCity
            label='地区'
            province={bankParams.province}
            city={bankParams.city}
            required={true}
            setProvince={this.setProvince}
            setCity={this.setCity}
            inputProvince={(el) => this.provinceRef = el}
            inputCity={(el) => this.cityRef = el}
          />
        }
        {isBankAccount &&
          <InputButton
            label='开户行'
            value={bankParams.isOther ? '其它' : bankParams.bankBranchName}
            required={true}
            handleClick={this.setBankBranch}
            inputRef={(el) => this.isOtherRef = el}
          />
        }
        {isBankAccount && !!bankParams.isOther &&
          <InputText
            label=''
            name='bankBranchName'
            maxLength='50'
            handleChange={(v) => setParams({ bankBranchName: v })}
            value={bankParams.bankBranchName}
            placeholder='请输入开户行'
            inputRef={(el) => this.bankBranchNameRef = el}
          />
        }
        {isBankAccount && (bankParams.isOther || bankParams.bankBranchName) &&
          <InputText
            label='开户行行号'
            name='bankCode'
            maxLength='20'
            handleChange={(v) => setParams({ bankCode: v })}
            value={bankParams.bankCode}
            inputRef={(el) => this.bankCodeRef = el}
          />
        }
        <div className='btns'>
          <FormButton
            text='保存'
            onClick={() => saveAccount(0, this.focusInput)}
          />
          { !bankParams.isDefault && <FormButton
              text='保存为默认'
              onClick={() => saveAccount(1, this.focusInput)}
            />
          }
        </div>
      </form>
    )
  }
}

export default AccountEditForm
