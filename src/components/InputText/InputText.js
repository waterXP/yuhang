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
    defaultValue: PropTypes.string,
    inputRef: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.state = {
      initialized: false
    }
  }

  componentDidUpdate () {
    const { defaultValue } = this.props
    const { initialized } = this.state
    if (!initialized && defaultValue) {
      this.inputRef.value = defaultValue
      this.setState({
        initialized: true
      })
    }
  }

  render () {
    const { label, name, placeholder, maxLength, inputRef,
      required, handleChange, defaultValue } = this.props
    return (
      <div className='wm-input-text'>
        {label && <label className='form-label'>{label}</label>}
        {required && <span className='required'>*</span>}
        <input
          type='text'
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleChange}
          ref={(el) => {
            this.inputRef = el
            inputRef && inputRef(el)
          }}
        />
      </div>
    )
  }
}

export default InputText
