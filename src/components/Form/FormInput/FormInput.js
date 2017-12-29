import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './FormInput.scss'

import FormWarning from '../FormWarning'

class FormInput extends Component {
  static propTypes = {
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func,
    type: PropTypes.string,
    submited: PropTypes.bool,
    isDifferent: PropTypes.bool,
    regStr: PropTypes.string,
    regFail: PropTypes.string,
    disabled: PropTypes.bool
  }

  constructor () {
    super(...arguments)
    this.handleChange = this::this.handleChange
  }

  handleChange (e) {
    this.props.setValue(e)
  }

  render () {
    const { label, name, value, isRequired, type, disabled,
      submited = true, isDifferent, regStr, regFail } = this.props
    return <div className='yh-form-input'>
      <span className='required'>{ isRequired ? '*' : ' ' }</span>
      <label className='form-label'>{ label }</label>
      <input
        name={name}
        className='form-text'
        type={type || 'text'}
        value={value || ''}
        onChange={this.handleChange}
        disabled={disabled}
      />
      { isRequired && submited && !value &&
        <FormWarning text={`请输入${label}`} /> }
      { submited && value &&
        isDifferent && name === 'confirm' &&
        <FormWarning text={`两次输入的密码不一样`} /> }
      { submited && value && regStr && !RegExp(regStr).test(value) &&
        <FormWarning text={regFail || `${label}格式不正确`} />}
    </div>
  }
}

export default FormInput
