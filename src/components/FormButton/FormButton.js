import React from 'react'
import PropTypes from 'prop-types'
import './FormButton.scss'

export const FormButton = ({ type, disabled, onClick, text }) => {
  return (
    <button
      type={type || 'button'}
      className='wm-form-button'
      disabled={disabled}
      onClick={onClick}>
      {text}
    </button>
  )
}

FormButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default FormButton
