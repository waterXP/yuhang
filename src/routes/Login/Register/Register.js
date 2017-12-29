import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Register.scss'
import { goLocation } from '@/lib/base'
import { registerStep } from '@/lib/enums'

import RegisterForm from '../components/RegisterForm'

import Breadcrumbs from '@/components/Breadcrumbs'
import StepPanel from '@/components/StepPanel'
import Record from '@/components/Record'

class Register extends Component {
  static propTypes = {
    register: PropTypes.func,
    getValidate: PropTypes.func,
    wrongValidate: PropTypes.bool,
    isBusy: PropTypes.bool
  }

  constructor () {
    super(...arguments)
    this.handleLink = this::this.handleLink
    this.handleSubmit = this::this.handleSubmit
    this.changeTab = this::this.changeTab
    this.setValue = this::this.setValue
    this.state = {
      type: 'mobile',
      params: {
      }
    }
  }

  handleLink () {
    // set the link target
    goLocation('/')
  }
  handleSubmit () {
    const { register } = this.props
    const { type, params } = this.state
    const { mobile, validate, mail, password, name, company,
      position, address, agree } = params
    const p = {
      password,
      name: name || '',
      company: company || '',
      position: position || '',
      address: address || '',
      agree
    }
    if (type === 'mobile') {
      p.mobile = mobile
      p.validate = validate
    } else {
      p.mail = mail
    }
    register(p, () => goLocation(
      type === 'mobile'
        ? '/login/complete'
        : '/login/confirm'
    ))
  }
  changeTab ({ key }) {
    if (key !== this.state.type) {
      this.setState({ type: key })
    }
  }
  setValue (p) {
    const { params } = this.state
    this.setState({ params: Object.assign({}, params, p) })
  }

  render () {
    const { getValidate, wrongValidate, isBusy } = this.props
    const { type, params } = this.state
    return <div className='yh-login-register content-panel'>
      <Breadcrumbs>创新余杭</Breadcrumbs>
      <StepPanel
        title='用户注册'
        step={registerStep}
        index={0}
      >
        <RegisterForm
          type={type}
          params={params}
          handleLink={this.handleLink}
          handleSubmit={this.handleSubmit}
          changeTab={this.changeTab}
          setValue={this.setValue}
          getValidate={getValidate}
          wrongValidate={wrongValidate}
          disabled={isBusy}
        />
        <Record />
      </StepPanel>
    </div>
  }
}

export default Register
