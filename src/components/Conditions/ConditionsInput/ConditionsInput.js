import React from 'react'
import PropTypes from 'prop-types'
import './ConditionsInput.scss'

const ConditionsInput = ({ type, value, placeholder, onChange, disabled }) =>
  <input
    className='yh-conditions-input'
    type={type || 'text'}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
  />

ConditionsInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

export default ConditionsInput
