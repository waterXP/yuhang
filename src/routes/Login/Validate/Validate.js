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
    setValidate: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.handleClick = this::this.handleClick
    this.state = { validate: '', showError: false }
  }

  handleClick () {
    this.props.setValidate(
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
    const { account, getValidate } = this.props
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
            />
            <TimerButton handleClick={() => getValidate()} />
          </div>
          <div className='warning'>
            { showError &&
              <span>
                <i className='fas fa-exclamation-circle' />
                输入的账号有误，请重新填写
              </span>
            }&nbsp;
          </div>
          <MainButton handleClick={this.handleClick}>下一步</MainButton>
          <Record />
        </StepPanel>
      </div>
  }
}

export default Validate
