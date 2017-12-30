import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Confirm.scss'
import { goLocation, mask, getImageCode } from '@/lib/base'
import { registerStep, forgetStep } from '@/lib/enums'

import Breadcrumbs from '@/components/Breadcrumbs'
import StepPanel from '@/components/StepPanel'
import Record from '@/components/Record'
import SendMessage from '@/components/SendMessage'
import BigButton from '@/components/BigButton'
import InputText from '@/components/InputText'
import MainButton from '@/components/MainButton'

class Confirm extends Component {
  static propTypes = {
    account: PropTypes.string,
    query: PropTypes.object,
    isBusy: PropTypes.bool,
    checkCode: PropTypes.func,
    toast: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.state = {
      validated: false,
      imgSrc: '',
      validate: '',
      showError: false
    }
    this.returnButton = this::this.returnButton
    this.getVCode = this::this.getVCode
    this.handleClick = this::this.handleClick
  }
  componentWillMount () {
    const { account, query } = this.props
    if (!account) {
      goLocation('/login')
    } else {
      if (query.from === 'forget') {
        this.getVCode()
      }
    }
  }

  returnButton () {
    goLocation('/login')
  }
  getVCode () {
    getImageCode(imgSrc =>
      this.setState({ imgSrc })
    )
  }
  handleClick () {
    const { account, checkCode, toast } = this.props
    const { validate } = this.state
    if (!validate) {
      toast('请输入验证码')
      return
    }
    checkCode(
      { email: account, vcode: validate },
      () => {
        this.setState({ validated: true })
      },
      () => {
        if (!this.state.showError) {
          this.setState({ showError: true })
        }
      }
    )
  }

  render () {
    const { account, query, isBusy } = this.props
    const { validated, imgSrc, validate, showError } = this.state
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
      {
        validated || query.from !== 'forget'
        ? <StepPanel
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
        : <StepPanel
          title={title}
          step={step}
          index={1}
        >
          <p className='email'>邮箱号<span>{ account }</span></p>
          <div className='validate-group'>
            <InputText
              value={validate}
              placeholder='验证码'
              setValue={v => this.setState({ validate: v })}
              disabled={isBusy}
            />
            <button
              className='vcode-button'
              type='button'
              onClick={this.getVCode}
              disabled={isBusy}
            >
              { imgSrc ? <img src={imgSrc} /> : '获取图片' }
            </button>
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
              : '确定'
            }
          </MainButton>
          <Record />
        </StepPanel>
      }
    </div>
  }
}

export default Confirm
