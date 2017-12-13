import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goLocation, getHighLightText, goBack, setQuery } from '@/lib/base'
import SearchForm from '@/components/SearchForm'
import './SettingsSetBranch.scss'

class SettingsSetBranch extends Component {
  static propTypes = {
    bankBranchs: PropTypes.array,
    currentBankCode: PropTypes.string,
    query: PropTypes.object,
    bankParams: PropTypes.object,
    setParams: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.state = {
      isBusy: false,
      filter: ''
    }
    this.inBusy = this::this.inBusy
    this.submitHandler = this::this.submitHandler
    this.cancelHandler = this::this.cancelHandler
    this.setBankBranch = this::this.setBankBranch
    this.setOtherBankBranch = this::this.setOtherBankBranch
  }

  componentWillMount () {
    const { bankBranchs, query } = this.props
    if (!bankBranchs) {
      goLocation({
        pathname: '/settings/edit/account',
        query
      })
    }
  }

  submitHandler (filter) {
    this.setState({ filter })
  }
  cancelHandler () {
    this.setState({ filter: '' })
  }
  inBusy (isBusy = true) {
    this.setState({ isBusy })
  }
  setBankBranch (v) {
    const { bankCode, bankName } = v
    // this.props.setCurrentBankBranchInfo(bankCode, bankName)
    // setQuery({ step: 'skip' })
    const { setParams } = this.props
    setParams({
      bankCode,
      bankBranchName: bankName,
      isOther: 0
    })
    goBack()
  }
  setOtherBankBranch () {
    const { bankParams, setParams } = this.props
    const { isOther } = bankParams
    if (!isOther) {
      setParams({
        isOther: 1,
        bankCode: '',
        bankBranchName: ''
      })
    }
    goBack()
  }

  render () {
    const { bankBranchs, bankParams } = this.props
    const { filter } = this.state
    console.log(bankParams)
    const { bankCode, isOther } = bankParams
    console.log(bankBranchs)
    let array = filter ? [] : bankBranchs
    if (filter) {
      bankBranchs.forEach(v => {
        if (~v.bankName.indexOf(filter)) {
          array.push(v)
        }
      })
    }
    return (
      <div className='wm-settings-set-branch'>
        <SearchForm
          inBusy={this.inBusy}
          submitHandler={this.submitHandler}
          cancelHandler={this.cancelHandler}
          hiddenButton
          immediately
        />
        <ul className='bank-list'>
          {
            array.map((v) => (
              <li
                key={v.bankCode}
                className={
                  `bank-name${bankCode === v.bankCode ? ' current' : ''}`
                }
                onClick={() => this.setBankBranch(v)}
              >
                { filter
                  ? <span
                      dangerouslySetInnerHTML={
                        getHighLightText(v.bankName, filter)
                      }
                    />
                  : v.bankName }
              </li>
            ))
          }
          <li
            className={
              `bank-name${isOther === 1 ? ' current' : ''}`
            }
            onClick={this.setOtherBankBranch}
          >其它</li>
        </ul>
      </div>
    )
  }
}

export default SettingsSetBranch
