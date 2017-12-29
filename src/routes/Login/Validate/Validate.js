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
    this.state = { validate: '', showError: false }
  }

  handleClick () {
    const { toast, setValidate } = this.props
    const { validate } = this.state
    if (!validate) {
      toast('请输入验证码')
      return
    }
    setValidate(
      (d) => {
        if (d) {
          goLocation('/login/modify')
        } else {
          this.setState({ showError: true })
        }
      }
    )
  }

  render () {
    const { account, getValidate, isBusy } = this.props
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
          <TimerButton handleClick={() => getValidate()} disabled={isBusy} />
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
