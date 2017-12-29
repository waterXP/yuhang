import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Forget.scss'
import { goLocation } from '@/lib/base'
import { forgetStep, regMobile, regMail } from '@/lib/enums'

import Breadcrumbs from '@/components/Breadcrumbs'
import StepPanel from '@/components/StepPanel'
import Record from '@/components/Record'
import InputText from '@/components/InputText'
import MainButton from '@/components/MainButton'

class Forget extends Component {
  static propTypes = {
    setForgetAccount: PropTypes.func,
    isBusy: PropTypes.bool
  }

  constructor () {
    super(...arguments)
    this.handleClick = this::this.handleClick
    this.state = { account: '', showError: false }
  }

  componentWillMount () {
    this.props.setForgetAccount()
  }

  handleClick () {
    const { account } = this.state
    const { setForgetAccount } = this.props
    if (account && (RegExp(regMobile).test(account) ||
      RegExp(regMail).test(account))) {
      setForgetAccount(account)
      if (RegExp(regMobile).test(account)) {
        goLocation('/login/validate')
      } else {
        goLocation({
          pathname: '/login/confirm',
          query: { from: 'forget' }
        })
      }
    } else {
      this.setState({ showError: true })
    }
  }

  render () {
    const { isBusy } = this.props
    const { showError, account } = this.state
    return <div className='yh-login-forget content-panel'>
      <Breadcrumbs>创新余杭</Breadcrumbs>
      <StepPanel
        title='重置密码'
        step={forgetStep}
        index={0}
      >
        <InputText
          value={account}
          placeholder='手机号/邮箱'
          setValue={v => this.setState({ account: v })}
          disabled={isBusy}
        />
        <div className='warning'>
          { showError &&
            <span>
              <i className='fas fa-exclamation-circle' />
              输入的账号有误，请重新填写
            </span>
          }&nbsp;
        </div>
        <MainButton handleClick={this.handleClick} disabled={isBusy}>
          下一步
        </MainButton>
        <Record />
      </StepPanel>
    </div>
  }
}

export default Forget
