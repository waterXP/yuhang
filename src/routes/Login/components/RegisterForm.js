import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { registerTab, registerForm } from '@/lib/enums'

import Tab from '@/components/Tab'
import Form from '@/components/Form'
import FormBuilder from '@/components/Form/FormBuilder'

class RegisterForm extends Component {
  static propTypes = {
    type: PropTypes.string,
    params: PropTypes.object,
    handleSubmit: PropTypes.func,
    handleLink: PropTypes.func,
    setValue: PropTypes.func,
    getValidate: PropTypes.func
  }
  constructor () {
    super(...arguments)
    this.state = { clock: 0, submited: false, tm: 0 }
    this.setValue = this::this.setValue
    this.setChange = this::this.setChange
    this.getValidate = this::this.getValidate
    this.startTimer = this::this.startTimer
    this.handleSubmit = this::this.handleSubmit
  }

  componentWillUnmount () {
    const { tm } = this.state
    tm && clearTimeout(tm)
  }

  setValue ({ target }) {
    const { name, value } = target
    this.props.setValue({ [name]: value })
  }
  setChange ({ target }) {
    const { name, checked } = target
    this.props.setValue({ [name]: checked })
  }
  getValidate () {
    this.props.getValidate(
      this.startTimer(60)
    )
  }
  startTimer (seconds) {
    this.setState(
      ({ clock }) => {
        return ({ clock: seconds || (clock - 1) })
      }, () => {
        if (this.state.clock > 0) {
          this.setState({
            tm: setTimeout(this.startTimer, 1000)
          })
        }
      }
    )
  }
  handleSubmit () {
    if (!this.state.submited) {
      this.setState({ submited: true })
    }
    const { type, params } = this.props
    const { mobile, validate, mail, password, confirm, agree } = params
    if (type === 'mobile') {
      const regPhone = /^1[34578]\d{9}$/
      if (agree && mobile && regPhone.test(mobile) &&
        validate && password === confirm) {
        this.props.handleSubmit()
      }
    } else {
      const regMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (agree && mail && regMail.test(mail) &&
        password === confirm) {
        this.props.handleSubmit()
      }
    }
  }

  render () {
    const {
      type,
      params = {},
      handleLink,
      changeTab,
      wrongValidate
    } = this.props
    const { clock, submited } = this.state
    return <div>
      <Tab
        list={registerTab}
        active={type}
        changeTab={changeTab}
      />
      <FormBuilder
        items={registerForm}
        unique={type}
        setValue={this.setValue}
        setChange={this.setChange}
        params={params}
        setTime={this.getValidate}
        clock={clock}
        handleLink={handleLink}
        handleSubmit={this.handleSubmit}
        submited={submited}
        wrongValidate={wrongValidate}
      />
    </div>
  }
}

export default RegisterForm
