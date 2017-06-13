import React from 'react'
import PropTypes from 'prop-types'
import './FormButton.scss'

export const FormButton = (props) => {
  return (
    <button
      type={props.type ? props.type : 'button'}
      className='btn btn-primary wm-form-button'
      disabled={props.disabled}
      onClick={props.onClick}>
      {props.text}
    </button>
  )
}

FormButton.propTypes = {
  text: PropTypes.string
}

export default FormButton
