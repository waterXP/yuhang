import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './InputButton.scss'

class InputButton extends Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.any,
    handleChange: PropTypes.func,
    handleClick: PropTypes.func,
    value: PropTypes.string,
    inputRef: PropTypes.func
  }

  render () {
    const { label, value, required, handleClick, placeholder,
      inputRef } = this.props
    return (
      <div className='wm-input-button'>
        { label && <label className='form-label'>{label}</label> }
        { required && <span className='required'>*</span> }
        <button
          type='button'
          onClick={handleClick}
          ref={(el) => inputRef && inputRef(el)}
        >
          { value || '请选择开户行' }
          <img className="img-right" src="imgs/icon_arrow.png" />
        </button>
      </div>
    )
  }
}

export default InputButton
