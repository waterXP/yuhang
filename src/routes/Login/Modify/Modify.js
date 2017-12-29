import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Modify.scss'
import { goLocation } from '@/lib/base'
import { forgetStep, regPassword } from '@/lib/enums'

import Breadcrumbs from '@/components/Breadcrumbs'
import StepPanel from '@/components/StepPanel'
import Record from '@/components/Record'
import MainButton from '@/components/MainButton'
import Form from '@/components/Form'

class Forget extends Component {
  static propTypes = {
    account: PropTypes.string,
    setNewPassword: PropTypes.func,
    isBusy: PropTypes.bool
  }

  constructor () {
    super(...arguments)
    this.handleClick = this::this.handleClick
    this.setValue = this::this.setValue
    this.state = {
      password: '',
      confirm: ''
    }
  }

  handleClick () {
    const { password, confirm } = this.state
    if (!RegExp(regPassword).test(password) || password !== confirm) {
      return
    }
    this.props.setNewPassword(
      (d) => {
        if (d) {
          goLocation({
            pathname: '/login/complete',
            query: { from: 'modify' }
          })
        }
      }
    )
  }
  setValue ({ target }) {
    const { value, name } = target
    this.setState({ [name]: value })
  }

  render () {
    const { account, isBusy} = this.props
    const { password, confirm } = this.state
    return <div className='yh-login-modify content-panel'>
      <Breadcrumbs>创新余杭</Breadcrumbs>
      <StepPanel
        title='重置密码'
        step={forgetStep}
        index={2}
      >
        <p className='mobile-number'>手机号／邮箱<span>{ account }</span></p>
        <Form.Input
          label='新登录密码'
          name='password'
          type='password'
          placeholder='密码长度6-16位，支持数字字母，下划线'
          value={password}
          setValue={this.setValue}
          regStr={regPassword}
          regFail='密码长度6-16位，支持数字字母，下划线'
          disabled={isBusy}
        />
        <Form.Input
          label='新登录密码'
          name='confirm'
          type='password'
          value={confirm}
          setValue={this.setValue}
          isDifferent={!!(confirm && password !== confirm)}
          disabled={isBusy}
        />
        <MainButton handleClick={this.handleClick} disabled={isBusy}>
          { isBusy
            ? <span>
              重置中&nbsp;<i className='fas fa-circle-notch fa-spin' />
            </span>
            : '确定'
          }
        </MainButton>
        <Record />
      </StepPanel>
    </div>
  }
}

export default Forget
