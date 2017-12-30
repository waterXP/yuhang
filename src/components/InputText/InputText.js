import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './InputText.scss'

class InputText extends Component {
  static propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string
  }

  render () {
    const { value, setValue, type, placeholder, disabled,
      className } = this.props
    return <input
      className={`yh-input-text${className ? ' ' + className : ''}`}
      type={type || 'text'}
      value={value}
      placeholder={placeholder}
      onChange={({ target }) => setValue(target.value)}
      disabled={disabled}
    />
  }
}

export default InputText
