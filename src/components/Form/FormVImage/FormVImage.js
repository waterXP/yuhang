import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './FormVImage.scss'

import { getImageCode } from '@/lib/base'
import FormWarning from '../FormWarning'

class FormValidate extends Component {
  static propTypes = {
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func,
    submited: PropTypes.bool,
    wrongValidate: PropTypes.bool,
    disabled: PropTypes.bool
  }

  constructor () {
    super(...arguments)
    this.getVCode = this::this.getVCode
    this.state = { imgSrc: '' }
  }
  componentWillMount () {
    this.getVCode()
  }

  getVCode () {
    getImageCode(imgSrc =>
      this.setState({ imgSrc })
    )
  }

  render () {
    const { label, name, value, setValue, isRequired,
      submited, wrongValidate, disabled } = this.props
    const { imgSrc } = this.state
    return <div className='yh-form-v-image'>
      <span className='required'>{ isRequired ? '*' : ' ' }</span>
      <label className='form-label'>{ label }</label>
      <input
        className='form-text'
        name={name}
        type='text'
        value={value || ''}
        onChange={setValue}
        disabled={disabled}
      />
      <button
        className='form-button'
        type='button'
        onClick={this.getVCode}
        disabled={disabled}
      >
        { imgSrc ? <img src={imgSrc} /> : '获取图片' }
      </button>
      { isRequired && submited && !value &&
        <FormWarning text={`请输入${label}`} /> }
      { submited && value && wrongValidate &&
        <FormWarning text={`验证码错误`} /> }
    </div>
  }
}

export default FormValidate
