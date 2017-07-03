import React from 'react'
import PropTypes from 'prop-types'
import './FormButton.scss'

export const FormButton = ({ type, disabled, onClick, text }) => {
  return (
    <button
      type={type || 'button'}
      className='btn btn-primary wm-form-button'
      disabled={disabled}
      onClick={onClick}>
      {text}
    </button>
  )
}

FormButton.propTypes = {
  text: PropTypes.string
}

export default FormButton
