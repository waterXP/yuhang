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
    defaultValue: PropTypes.string
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
      this.refs.content.value = defaultValue
      this.setState({
        initialized: true
      })
    }
  }

  render () {
    const { label, name, placeholder, maxLength,
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
          ref='content'
        />
      </div>
    )
  }
}

export default InputText
