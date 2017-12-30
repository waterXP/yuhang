import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Validate.scss'
import { forgetStep } from '@/lib/enums'
import { goLocation } from '@/lib/base'

import Breadcrumbs from '@/components/Breadcrumbs'
import StepPanel from '@/components/StepPanel'
import Record from '@/components/Record'
import InputText from '@/components/InputText'
import MainButton from '@/components/MainButton'
import TimerButton from '@/components/TimerButton'

class Validate extends Component {
  static propTypes = {
    account: PropTypes.string,
    getValidate: PropTypes.func,
    setValidate: PropTypes.func,
    toast: PropTypes.func,
    isBusy: PropTypes.bool
  }

  constructor () {
    super(...arguments)
    this.handleClick = this::this.handleClick
    this.getValidate = this::this.getValidate
    this.state = { validate: '', showError: false }
  }
  componentWillMount () {
    if (this.props.account === '') {
      goLocation('/login/forget', true)
    }
  }

  handleClick () {
    const { toast, setValidate, account } = this.props
    const { validate } = this.state
    if (!validate) {
      toast('请输入验证码')
      return
    }

    setValidate(
      { phone: account, code: validate, type: 2 },
      () => {
        goLocation('/login/modify')
      },
      () => {
        this.setState({ showError: true })
      }
    )
  }
  getValidate () {
    const { account, getValidate, toast } = this.props
    getValidate(
      'get /vcode/send-phone',
      { phone: account, type: 2 },
      (d) => {
        toast('correct', '验证码发送成功')
      }
    )
  }

  render () {
    const { account, isBusy } = this.props
    const { validate, showError } = this.state
    return <div className='yh-login-validate content-panel'>
      <Breadcrumbs>创新余杭</Breadcrumbs>
      <StepPanel
        title='重置密码'
        step={forgetStep}
        index={1}
      >
        <p className='mobile-number'>手机号<span>{ account }</span></p>
        <div className='validate-group'>
          <InputText
            value={validate}
            placeholder='验证码'
            setValue={v => this.setState({ validate: v })}
            disabled={isBusy}
          />
          <TimerButton handleClick={this.getValidate} disabled={isBusy} />
        </div>
        <div className='warning'>
          { showError &&
            <span>
              <i className='fas fa-exclamation-circle' />
              验证码不正确，请重新输入
            </span>
          }&nbsp;
        </div>
        <MainButton handleClick={this.handleClick} disabled={isBusy}>
          { isBusy
            ? <span>验证中&nbsp;<i className='fas fa-circle-notch fa-spin' /></span>
            : '下一步'
          }
        </MainButton>
        <Record />
      </StepPanel>
    </div>
  }
}

export default Validate
