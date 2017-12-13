import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './InputText.scss'

class InputText extends Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    maxLength: PropTypes.any,
    handleChange: PropTypes.func,
    handleClick: PropTypes.func,
    value: PropTypes.string,
    inputRef: PropTypes.func
  }

  render () {
    const { label, name, placeholder, maxLength, inputRef,
      required, handleChange, handleClick, value } = this.props
    return (
      <div className='wm-input-text'>
        { label && <label className='form-label'>{label}</label> }
        { required && <span className='required'>*</span> }
        <input
          type='text'
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={({ target }) => handleChange(target.value)}
          onClick={handleClick}
          ref={(el) => inputRef && inputRef(el)}
          value={value || ''}
        />
      </div>
    )
  }
}

export default InputText
