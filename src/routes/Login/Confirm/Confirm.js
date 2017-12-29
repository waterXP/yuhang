import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Confirm.scss'
import { goLocation, mask } from '@/lib/base'
import { registerStep, forgetStep } from '@/lib/enums'

import Breadcrumbs from '@/components/Breadcrumbs'
import StepPanel from '@/components/StepPanel'
import Record from '@/components/Record'
import SendMessage from '@/components/SendMessage'
import BigButton from '@/components/BigButton'

class Confirm extends Component {
  static propTypes = {
    account: PropTypes.string,
    query: PropTypes.object
  }

  constructor () {
    super(...arguments)
    this.returnButton = this::this.returnButton
  }
  componentWillMount () {
    const { account } = this.props
    if (!account) {
      goLocation('/login')
    }
  }

  returnButton () {
    goLocation('/login')
  }

  render () {
    const { account, query } = this.props
    const values = query.from === 'forget'
      ? {
        title: '重置密码',
        step: forgetStep,
        tips: '请在24小时内点击邮件中的链接完成密码重置。'
      } : {
        title: '用户注册',
        step: registerStep,
        tips: '请在24小时内点击邮件中的链接完成注册。'
      }
    const { title, step, tips } = values
    return <div className='yh-login-confirm content-panel'>
      <Breadcrumbs>创新余杭</Breadcrumbs>
      <StepPanel
        title={title}
        step={step}
        index={1}
      >
        <SendMessage
          mail={mask(account)}
          tips={tips}
        />
        <BigButton text='返回' handleClick={this.returnButton} />
        <Record />
      </StepPanel>
    </div>
  }
}

export default Confirm
