import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Complete.scss'
import { goLocation } from '@/lib/base'
import { registerStep, forgetStep } from '@/lib/enums'

import Breadcrumbs from '@/components/Breadcrumbs'
import StepPanel from '@/components/StepPanel'
import Record from '@/components/Record'
import BigButton from '@/components/BigButton'
import Congratulation from '@/components/Congratulation'

class Complete extends Component {
  static propTypes = {
    query: PropTypes.object
  }

  constructor () {
    super(...arguments)
    this.loginButton = this::this.loginButton
  }

  loginButton () {
    goLocation('/login')
  }

  render () {
    const { query } = this.props
    const values = query.from === 'modify'
      ? {
        title: '重置密码',
        step: forgetStep,
        index: 3,
        congratulation: '恭喜，密码重置成功！'
      } : {
        title: '用户注册',
        step: registerStep,
        index: 2,
        congratulation: '恭喜，新用户注册成功！'
      }
    return <div className='yh-login-complete content-panel'>
      <Breadcrumbs>创新余杭</Breadcrumbs>
      <StepPanel
        title={values.title}
        step={values.step}
        index={values.index}
      >
        <Congratulation text={values.congratulation} />
        <BigButton text='立即登录' handleClick={this.loginButton} />
        <Record />
      </StepPanel>
    </div>
  }
}

export default Complete
