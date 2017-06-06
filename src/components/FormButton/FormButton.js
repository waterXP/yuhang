import React from 'react'
import PropTypes from 'prop-types'
import './FormButton.scss'

export const FormButton = (props) => {
  return (
    <button className='btn btn-primary wm-form-button'>{props.text}</button>
  )
}

FormButton.propTypes = {
  text: PropTypes.string
}

export default FormButton