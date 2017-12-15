import React from 'react'
import PropTypes from 'prop-types'
import './FormValidate.scss'

import FormWarning from '../FormWarning'

const FormValidate = ({ label, name, value, setValue, isRequired,
  handleClick, clock, submited, wrongValidate }) =>
  <div className='yh-form-validate'>
    <span className='required'>{ isRequired ? '*' : ' ' }</span>
    <label className='form-label'>{ label }</label>
    <input
      className='form-text'
      name={name}
      type='text'
      value={value || ''}
      onChange={setValue}
    />
    <button
      className={`form-button${clock ? ' disabled' : ''}`}
      type='button'
      onClick={!clock && handleClick}
    >
      { clock ? `重新发送(${clock})`  : '发送验证码' }
    </button>
    { isRequired && submited && !value &&
      <FormWarning text={`请输入${label}`} /> }
    { submited && value && wrongValidate &&
      <FormWarning text={`验证码错误`} /> }
  </div>

FormValidate.propTypes = {
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  handleClick: PropTypes.func,
  clock: PropTypes.number,
  submited: PropTypes.bool,
  wrongValidate: PropTypes.bool
}

export default FormValidate
